import type Config from 'webpack-5-chain';
import type { WebpackBuildConfig } from '../../../shared';
import { deepmerge } from '@fesjs/utils';
import { esmRequire, esmResolve } from '../../../shared';

interface CreateRulesOptions {
    isDev: boolean;
    webpackConfig: Config;
    config: WebpackBuildConfig;
    lang: string;
    test: RegExp;
    loader?: string;
    options?: any;
    browserslist: string[];
    styleLoaderOption?: any;
}

interface ApplyLoadersOptions {
    modules?: {
        localIdentName: string;
    };
}

function createRules({ isDev, webpackConfig, config, lang, test, loader, options, browserslist, styleLoaderOption }: CreateRulesOptions) {
    function applyLoaders(rule: any, cssLoaderOption: ApplyLoadersOptions = {}) {
        if (isDev || !config.extraCSS) {
            rule.use('extra-css-loader').loader(esmResolve('style-loader')).options(Object.assign({}, styleLoaderOption));
        }
        else {
            const loaderOptions = config.extraCSS?.loader ?? {};

            rule.use('extra-css-loader')
                .loader(esmRequire('mini-css-extract-plugin').loader)
                .options(loaderOptions);
        }

        rule.use('css-loader')
            .loader(esmResolve('css-loader'))
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
            .loader(esmResolve('postcss-loader'))
            .options(
                deepmerge(
                    {
                        postcssOptions: () => ({
                            plugins: [
                                // https://github.com/luisrudge/postcss-flexbugs-fixes
                                esmRequire('postcss-flexbugs-fixes'),
                                esmRequire('postcss-safe-parser'),
                                [esmRequire('autoprefixer'), { overrideBrowserslist: browserslist }],
                                ...(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []),
                            ],
                        }),
                    },
                    config.postcssLoader || {},
                ),
            );

        if (loader) {
            rule.use(loader).loader(esmResolve(loader)).options(options);
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

interface CreateCssWebpackConfigOptions {
    isDev: boolean;
    config: WebpackBuildConfig;
    webpackConfig: Config;
    browserslist: string[];
}

export default function createCssWebpackConfig({ isDev, config, webpackConfig, browserslist }: CreateCssWebpackConfigOptions) {
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
        webpackConfig.plugin('extra-css').use(esmResolve('mini-css-extract-plugin'), [
            Object.assign(
                {
                    filename: 'static/[name].[contenthash:8].css',
                    chunkFilename: 'static/[id].[contenthash:8].css',
                },
                config.extraCSS?.plugin ?? {},
            ),
        ]);
    }

    if (!isDev) {
        webpackConfig.optimization.minimizer('css').use(esmResolve('css-minimizer-webpack-plugin'), [{}]);
    }

    return (options: Partial<CreateRulesOptions>) => {
        createRules({
            isDev,
            config,
            webpackConfig,
            browserslist,
            ...options,
        } as CreateRulesOptions);
    };
}
