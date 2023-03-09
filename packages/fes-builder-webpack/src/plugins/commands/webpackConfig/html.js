import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { winPath, resolveRuntimeEnv } from '@fesjs/utils';

export default async function createHtmlWebpackConfig({ api, cwd, config, webpackConfig, headScripts, isProd, publicPath }) {
    const htmlOptions = {
        filename: '[name].html',
        ...config.html,
        templateParameters: {
            title: api.config.title || config.html?.title || 'fes.js',
            ...resolveRuntimeEnv(publicPath),
            mountElementId: config.mountElementId,
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
    const defaultHtmlPath = resolve(__dirname, 'index-default.html');
    const publicCopyIgnore = [];

    // default, single page setup.
    htmlOptions.template = existsSync(htmlPath) ? htmlPath : defaultHtmlPath;

    publicCopyIgnore.push(winPath(htmlOptions.template));

    webpackConfig.plugin('html').use(require.resolve('html-webpack-plugin'), [htmlOptions]);

    // 如果需要导出html，则根据路由生成对应的html文件
    if (config.exportStatic) {
        const routes = await api.getRoutes();
        const addHtml = (_routes) => {
            if (Array.isArray(_routes)) {
                _routes.forEach((route) => {
                    const _fileName = `${route.path.slice(1) || 'index'}.html`;
                    if (_fileName !== 'index.html') {
                        const _htmlOptions = {
                            ...config.html,
                            filename: _fileName,
                            templateParameters: {
                                title: route?.meta?.title || config.html.title || api.config.title || 'fes.js',
                                ...resolveRuntimeEnv(publicPath),
                                mountElementId: config.mountElementId,
                            },
                        };
                        webpackConfig.plugin(_fileName).use(require.resolve('html-webpack-plugin'), [_htmlOptions]);
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
        webpackConfig.plugin('html-tags').use(require.resolve('html-webpack-tags-plugin'), [
            {
                append: false,
                scripts: headScriptsMap.map((script) => ({
                    path: script.src,
                })),
            },
        ]);
    }
    return {
        publicCopyIgnore,
    };
}
