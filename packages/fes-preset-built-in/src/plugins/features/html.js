import { resolve, join } from 'path';
import { existsSync } from 'fs';

export default (api) => {
    api.describe({
        key: 'html',
        config: {
            schema(joi) {
                return joi
                    .object({
                        options: joi.object(),
                        pages: joi.object()
                    })
                    .description(
                        'more html-webpack-plugin options see https://github.com/jantimon/html-webpack-plugin#configuration'
                    );
            },
            default: {
                options: {}
            }
        }
    });

    api.chainWebpack(async (webpackConfig) => {
        const isProd = api.env === 'production';
        const htmlOptions = {
            templateParameters: (compilation, assets, pluginOptions) => {
                // enhance html-webpack-plugin's built in template params
                let stats;
                return {
                    // make stats lazy as it is expensive
                    get webpack() {
                        // eslint-disable-next-line
                        return stats || (stats = compilation.getStats().toJson());
                    },
                    compilation,
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        files: assets,
                        options: pluginOptions
                    }
                };
            },
            ...api.config.html.options
        };


        if (isProd) {
            Object.assign(htmlOptions, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeScriptTypeAttributes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                }
            });
        }

        const HTMLPlugin = require('html-webpack-plugin');
        const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
        const PreloadPlugin = require('@vue/preload-webpack-plugin');
        const multiPageConfig = api.config.html.pages;
        const htmlPath = join(api.paths.cwd, 'public/index.html');
        const defaultHtmlPath = resolve(__dirname, 'index-default.html');
        const publicCopyIgnore = ['.DS_Store'];

        if (!multiPageConfig) {
            // default, single page setup.
            htmlOptions.template = existsSync(htmlPath)
                ? htmlPath
                : defaultHtmlPath;

            publicCopyIgnore.push({
                glob: htmlOptions.template,
                matchBase: false
            });

            webpackConfig
                .plugin('html')
                .use(HTMLPlugin, [htmlOptions]);

            // TODO onlyHtml 将资源注入 html 中的逻辑
            if (!htmlOptions.onlyHtml || htmlOptions.preload !== false) {
                // inject preload/prefetch to HTML
                webpackConfig
                    .plugin('preload')
                    .use(PreloadPlugin, [{
                        rel: 'preload',
                        include: 'initial',
                        fileBlacklist: [/\.map$/, /hot-update\.js$/]
                    }]);

                webpackConfig
                    .plugin('prefetch')
                    .use(PreloadPlugin, [{
                        rel: 'prefetch',
                        include: 'asyncChunks'
                    }]);
            }
        } else {
            // TODO 支持多页
        }

        if (!isProd) {
            const headScripts = await api.applyPlugins({
                key: 'addHTMLHeadScripts',
                type: api.ApplyPluginsType.add,
                initialState: []
            });
            webpackConfig
                .plugin('html-tags')
                .use(HtmlWebpackTagsPlugin, [{
                    append: true,
                    scripts: headScripts.map(script => ({
                        path: script.src
                    }))
                }]);
        }
    });
};
