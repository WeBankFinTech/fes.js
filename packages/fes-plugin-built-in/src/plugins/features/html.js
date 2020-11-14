import { resolve, join } from 'path';
import { existsSync } from 'fs';

export default (api) => {
    api.describe({
        key: 'vueLoader',
        config: {
            schema(joi) {
                return joi
                    .object({})
                    .description(
                        'more vue-loader options see https://vue-loader.vuejs.org/',
                    );
            }
        }
    });

    api.chainWebpack((webpackConfig) => {
        const isProd = api.env === 'production';
        const htmlOptions = {
            title: api.service.pkg.name,
            templateParameters: (compilation, assets, pluginOptions) => {
                // enhance html-webpack-plugin's built in template params
                let stats;
                return Object.assign({
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
                }, api.config.html);
            }
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

        // resolve HTML file(s)
        const htmlPath = join(api.paths.cwd, 'public/index.html');
        const defaultHtmlPath = resolve(__dirname, 'index-default.html');
        htmlOptions.template = existsSync(htmlPath)
            ? htmlPath
            : defaultHtmlPath;

        webpackConfig
            .plugin('html')
            .use(require('html-webpack-plugin'), [htmlOptions]);
    });
};
