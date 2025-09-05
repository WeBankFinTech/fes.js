import type { IPluginAPI } from '@fesjs/shared';
import type { WebpackBuildConfig } from '../../../shared';
import { existsSync } from 'node:fs';
import { relative } from 'node:path';
import process from 'node:process';
import { cleanTmpPathExceptCache, getBundleAndConfigs, printFileSizes } from '../../common/buildDevUtils';
import { build } from './build';

export default function (api: IPluginAPI<WebpackBuildConfig>) {
    const {
        paths,
        utils: { rimraf, logger },
    } = api;

    api.registerCommand({
        command: 'build',
        description: 'build application for production',
        async fn() {
            cleanTmpPathExceptCache({
                absTmpPath: paths.absTmpPath,
            });

            // generate files
            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            // build
            const { bundleConfig } = await getBundleAndConfigs({ api });
            try {
                // clear output path before exec build
                if (process.env.CLEAR_OUTPUT !== 'none') {
                    if (paths.absOutputPath && existsSync(paths.absOutputPath)) {
                        logger.info(`Clear OutputPath: ${paths.absOutputPath}`);
                        rimraf.sync(paths.absOutputPath);
                    }
                }

                const { stats } = await build(bundleConfig);
                if (process.env.RM_TMPDIR !== 'none') {
                    rimraf.sync(paths.absTmpPath);
                }
                if (stats) {
                    printFileSizes({ stats, dir: relative(process.cwd(), paths.absOutputPath) });
                }
                await api.applyPlugins({
                    key: 'onBuildComplete',
                    type: api.ApplyPluginsType.event,
                    args: {
                        stats,
                    },
                });
            }
            catch (err) {
                await api.applyPlugins({
                    key: 'onBuildComplete',
                    type: api.ApplyPluginsType.event,
                    args: {
                        err,
                    },
                });
                // throw build error
                throw err;
            }
        },
    });
}
