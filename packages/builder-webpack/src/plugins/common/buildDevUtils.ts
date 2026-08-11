import type { IPluginAPI } from '@fesjs/shared';
import type webpack from 'webpack';
import type { WebpackBuildConfig } from '../../shared';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import zlib from 'node:zlib';
import { rimraf } from '@fesjs/utils';
import pc from 'picocolors';
import UI from 'cliui';
import getConfig from './webpackConfig';

interface GetBundleAndConfigsOptions {
    api: IPluginAPI<WebpackBuildConfig>;
}

interface GetBundleAndConfigsResult {
    bundleConfig: webpack.Configuration;
}

export async function getBundleAndConfigs({ api }: GetBundleAndConfigsOptions): Promise<GetBundleAndConfigsResult> {
    // get config
    const env = api.env === 'production' ? 'production' : 'development';
    const getConfigOpts: any = await api.applyPlugins({
        type: api.ApplyPluginsType.modify,
        key: 'modifyBundleConfigOpts',
        initialValue: {
            cwd: api.paths.cwd,
            config: api.config,
            env,
            entry: {
                index: join(api.paths.absTmpPath, 'fes.js'),
            },
            async modifyBabelOpts(opts: any) {
                return api.applyPlugins({
                    type: api.ApplyPluginsType.modify,
                    key: 'modifyBabelOpts',
                    initialValue: opts,
                });
            },
            async modifyBabelPresetOpts(opts: any) {
                return api.applyPlugins({
                    type: api.ApplyPluginsType.modify,
                    key: 'modifyBabelPresetOpts',
                    initialValue: opts,
                });
            },
            async chainWebpack(webpackConfig: any, opts: any) {
                return api.applyPlugins({
                    type: api.ApplyPluginsType.modify,
                    key: 'chainWebpack',
                    initialValue: webpackConfig,
                    args: {
                        ...opts,
                    },
                });
            },
            async headScripts() {
                return api.applyPlugins({
                    key: 'addHTMLHeadScripts',
                    type: api.ApplyPluginsType.add,
                    initialValue: [],
                });
            },
            publicPath: await api.applyPlugins({
                key: 'modifyPublicPathStr',
                type: api.ApplyPluginsType.modify,
                initialValue: api.config.publicPath || '',
                args: {},
            }),
        },
        args: {},
    });

    const bundleConfig: webpack.Configuration = await api.applyPlugins({
        type: api.ApplyPluginsType.modify,
        key: 'modifyBundleConfig',
        initialValue: await getConfig({ api, ...getConfigOpts }),
        args: {},
    });

    return { bundleConfig };
}

interface CleanTmpPathExceptCacheOptions {
    absTmpPath: string;
}

export function cleanTmpPathExceptCache({ absTmpPath }: CleanTmpPathExceptCacheOptions) {
    rimraf.sync(absTmpPath);
}

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 1.8 * 1024 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1 * 1024 * 1024;

interface PrintFileSizesOptions {
    stats: webpack.Stats;
    dir: string;
}

export function printFileSizes({ stats, dir }: PrintFileSizesOptions) {
    const ui = UI({ width: 80 });
    const json: any = stats.toJson({
        hash: false,
        modules: false,
        chunks: false,
    });

    const filesize = (bytes: number) => {
        bytes = Math.abs(bytes);
        const radix = 1024;
        const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let loop = 0;

        // calculate
        while (bytes >= radix) {
            bytes /= radix;
            ++loop;
        }
        return `${bytes.toFixed(1)} ${unit[loop]}`;
    };

    const assets: any[] = json.assets ? json.assets : json?.children?.reduce((acc: any, child: any) => acc.concat(child?.assets), []);

    const seenNames = new Map();
    const isJS = (val: string) => /\.js$/.test(val);
    const isCSS = (val: string) => /\.css$/.test(val);

    const orderedAssets: any[] = assets
        .map((a: any) => {
            a.name = a.name.split('?')[0];
            // These sizes are pretty large
            const isMainBundle = a.name.indexOf('fes.') === 0;
            const maxRecommendedSize = isMainBundle ? WARN_AFTER_BUNDLE_GZIP_SIZE : WARN_AFTER_CHUNK_GZIP_SIZE;
            const isLarge = maxRecommendedSize && a.size > maxRecommendedSize;
            return {
                ...a,
                suggested: isLarge && isJS(a.name),
            };
        })
        .filter((a: any) => {
            if (seenNames.has(a.name)) {
                return false;
            }
            seenNames.set(a.name, true);
            return isJS(a.name) || isCSS(a.name);
        })
        .sort((a: any, b: any) => {
            if (isJS(a.name) && isCSS(b.name)) {
                return -1;
            }
            if (isCSS(a.name) && isJS(b.name)) {
                return 1;
            }
            return b.size - a.size;
        });

    function getGzippedSize(asset: any) {
        const filepath = resolve(join(dir, asset.name));
        if (existsSync(filepath)) {
            const buffer = readFileSync(filepath);
            return filesize(zlib.gzipSync(buffer).length);
        }
        return filesize(0);
    }

    function makeRow(a: string, b: string, c: string) {
        return ` ${a}\t      ${b}\t ${c}`;
    }

    ui.div(
        `${makeRow(pc.cyan(pc.bold('File')), pc.cyan(pc.bold('Size')), pc.cyan(pc.bold('Gzipped')))}\n\n${orderedAssets
            .map((asset: any) =>
                makeRow(
                    asset.name.endsWith('js')
                        ? asset.suggested
                            ? pc.yellow(join(dir, asset.name))
                            : pc.green(join(dir, asset.name))
                        : pc.blue(join(dir, asset.name)),
                    filesize(asset.size),
                    getGzippedSize(asset),
                ),
            )
            .join('\n')}`,
    );

    // eslint-disable-next-line no-console
    console.log(`${ui.toString()}\n\n  ${pc.gray('Images and other types of assets omitted.')}\n`);

    if (orderedAssets?.some((asset: any) => asset.suggested)) {
        // eslint-disable-next-line no-console
        console.log();
        // eslint-disable-next-line no-console
        console.log(pc.yellow('The bundle size is significantly larger than recommended.'));
        // eslint-disable-next-line no-console
        console.log(pc.yellow('Consider reducing it with code splitting'));
        // eslint-disable-next-line no-console
        console.log(pc.yellow('You can also analyze the project dependencies using ANALYZE=1'));
        // eslint-disable-next-line no-console
        console.log();
    }
}
