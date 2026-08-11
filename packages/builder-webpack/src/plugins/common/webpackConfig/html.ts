import type { IPluginAPI } from '@fesjs/shared';
import type { WebpackBuildConfig } from '../../../shared';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveRuntimeEnv, winPath } from '@fesjs/utils';
import { esmResolve } from '../../../shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CreateHtmlWebpackConfigOptions {
    api: IPluginAPI<WebpackBuildConfig>;
    cwd: string;
    config: WebpackBuildConfig;
    webpackConfig: any;
    headScripts?: () => Promise<Array<{ src: string }>>;
    isProd: boolean;
    publicPath?: string;
}

interface Route {
    path: string;
    meta?: {
        title?: string;
    };
    children?: Route[];
}

export default async function createHtmlWebpackConfig({ api, cwd, config, webpackConfig, headScripts, isProd, publicPath }: CreateHtmlWebpackConfigOptions) {
    const htmlOptions: any = {
        filename: '[name].html',
        ...config.html,
        templateParameters: {
            title: (api.config as any).title || config.html?.title || 'fes.js',
            ...resolveRuntimeEnv(publicPath || ''),
            mountElementId: (config as any).mountElementId,
        },
    };

    if (isProd) {
        Object.assign(htmlOptions, {
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
        });
    }

    const htmlPath = join(cwd, 'index.html');
    const defaultHtmlPath = join(__dirname, '../index-default.html');
    const publicCopyIgnore: string[] = [];

    // default, single page setup.
    htmlOptions.template = existsSync(htmlPath) ? htmlPath : defaultHtmlPath;

    publicCopyIgnore.push(winPath(htmlOptions.template));

    webpackConfig.plugin('html').use(esmResolve('html-webpack-plugin'), [htmlOptions]);

    // 如果需要导出html，则根据路由生成对应的html文件
    if ((config as any).exportStatic) {
        const routes: Route[] = await (api as any).getRoutes();
        const addHtml = (_routes: Route[] | undefined) => {
            if (Array.isArray(_routes)) {
                _routes.forEach((route) => {
                    const _fileName = `${route.path.slice(1) || 'index'}.html`;
                    if (_fileName !== 'index.html') {
                        const _htmlOptions = {
                            ...config.html,
                            filename: _fileName,
                            templateParameters: {
                                title: route?.meta?.title || config.html?.title || (api.config as any).title || 'fes.js',
                                ...resolveRuntimeEnv(publicPath!),
                                mountElementId: (config as any).mountElementId,
                            },
                        };
                        webpackConfig.plugin(_fileName).use(esmResolve('html-webpack-plugin'), [_htmlOptions]);
                    }
                    if (route.children && route.children.length) {
                        addHtml(route.children);
                    }
                });
            }
        };
        addHtml(routes);
    }

    if (headScripts) {
        const headScriptsMap = await headScripts();
        webpackConfig.plugin('html-tags').use(esmResolve('html-webpack-tags-plugin'), [
            {
                append: false,
                scripts: headScriptsMap.map(script => ({
                    path: script.src,
                })),
            },
        ]);
    }
    return {
        publicCopyIgnore,
    };
}
