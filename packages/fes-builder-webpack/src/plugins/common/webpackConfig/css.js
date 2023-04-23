// css less post-css mini-css css 压缩
// extraPostCSSPlugins
// postcssLoader
// lessLoader
// css-loader
// 支持 热加载
// 性能优化
// css 压缩 https://github.com/webpack-contrib/css-minimizer-webpack-plugin
// 根据 entry 进行代码块拆分
// 根据 entry 将文件输出到不同的文件夹
import { deepmerge } from '@fesjs/utils';

function createRules({ isDev, webpackConfig, config, lang, test, loader, options, browserslist, styleLoaderOption }) {
    function applyLoaders(rule, cssLoaderOption = {}) {
        if (isDev || !config.extraCSS) {
            rule.use('extra-css-loader').loader(require.resolve('style-loader')).options(Object.assign({}, styleLoaderOption));
        } else {
            rule.use('extra-css-loader')
                .loader(require('mini-css-extract-plugin').loader)
                .options(config.extraCSS?.loader ?? {});
        }

        rule.use('css-loader')
            .loader(require.resolve('css-loader'))
            .options(
                deepmerge(
                    {
                        importLoaders: 1,
                        ...cssLoaderOption,
                    },
                    config.cssLoader || {},
                ),
            );

        rule.use('postcss-loader')
            .loader(require.resolve('postcss-loader'))
            .options(
                deepmerge(
                    {
                        postcssOptions: () => ({
                            plugins: [
                                // https://github.com/luisrudge/postcss-flexbugs-fixes
                                require('postcss-flexbugs-fixes'),
                                require('postcss-safe-parser'),
                                [require('autoprefixer'), { ...config.autoprefixer, overrideBrowserslist: browserslist }],
                                ...(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []),
                            ],
                        }),
                    },
                    config.postcssLoader || {},
                ),
            );

        if (loader) {
            rule.use(loader).loader(require.resolve(loader)).options(options);
        }
    }

    const rule = webpackConfig.module.rule(lang).test(test);
    applyLoaders(rule.oneOf('css-modules').resourceQuery(/module/), {
        modules: {
            localIdentName: '[local]___[hash:base64:5]',
        },
    });
    applyLoaders(rule.oneOf('css'));
}

export default function createCssWebpackConfig({ isDev, config, webpackConfig, browserslist }) {
    createRules({
        isDev,
        webpackConfig,
        config,
        lang: 'css',
        test: /\.css$/,
        browserslist,
    });

    createRules({
        isDev,
        webpackConfig,
        config,
        lang: 'less',
        test: /\.less$/,
        loader: 'less-loader',
        options: {
            lessOptions: {
                javascriptEnabled: true,
                ...config.lessLoader,
            },
        },
        browserslist,
    });

    if (!isDev && config.extraCSS) {
        webpackConfig.plugin('extra-css').use(require.resolve('mini-css-extract-plugin'), [
            Object.assign(
                {
                    filename: 'static/[name].[contenthash:8].css',
                    chunkFilename: 'static/[id].[contenthash:8].css',
                },
                config.extraCSS?.plugin ?? {},
            ),
        ]);
        webpackConfig.optimization.minimizer('css').use(require.resolve('css-minimizer-webpack-plugin'), [{}]);
    }

    return (options) => {
        createRules({
            isDev,
            config,
            webpackConfig,
            browserslist,
            ...options,
        });
    };
}
