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

import deepmerge from 'deepmerge';

function createRules({
    isDev,
    webpackConfig,
    config,
    lang,
    test,
    loader,
    options,
    browserslist
}) {
    const rule = webpackConfig.module.rule(lang).test(test);

    if (isDev) {
        rule.use('extra-css-loader')
            .loader(require.resolve('style-loader'))
            .options({
            });
    } else {
        rule.use('extra-css-loader')
            .loader(require('mini-css-extract-plugin').loader)
            .options({
            });
    }

    rule.use('css-loader')
        .loader(require.resolve('css-loader'))
        .options({
            ...config.cssLoader
        });

    rule.use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options(deepmerge({
            postcssOptions: () => ({
                plugins: [
                    // https://github.com/luisrudge/postcss-flexbugs-fixes
                    require('postcss-flexbugs-fixes'),
                    require('postcss-safe-parser'),
                    [require('autoprefixer'), { ...config.autoprefixer, overrideBrowserslist: browserslist }],
                    ...(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : [])
                ]
            })
        }, config.postcssLoader || {}));

    if (loader) {
        rule.use(loader)
            .loader(require.resolve(loader))
            .options(options);
    }
}

export default function createCssWebpackConfig({
    isDev,
    config,
    webpackConfig,
    browserslist
}) {
    createRules({
        isDev,
        webpackConfig,
        config,
        lang: 'css',
        test: /\.css$/,
        browserslist
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
                ...config.lessLoader
            }
        },
        browserslist
    });

    webpackConfig.plugin('extra-css')
        .use(require.resolve('mini-css-extract-plugin'), [{
            filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
            chunkFilename: isDev ? '[id].css' : '[id].[contenthash:8].css'
        }]);

    if (!isDev) {
        webpackConfig.optimization
            .minimizer('css')
            .use(require.resolve('css-minimizer-webpack-plugin'), [{}]);
    }

    return (options) => {
        createRules({
            isDev,
            config,
            webpackConfig,
            browserslist,
            ...options
        });
    };
}
