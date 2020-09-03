const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const browsers = require('../helpers/browser');

module.exports = function webpackConfig(configs, webpack, mode) {
    let template = path.resolve(
        configs.folders.PROJECT_DIR,
        './src/index.html'
    );
    if (!fs.existsSync(template)) {
        template = path.resolve(configs.folders.FES_DIR, './src/index.html');
    }

    const isDev = mode === 'dev';
    const isBuild = mode === 'build';

    const projectNodeModulesDir = path.resolve(
        configs.folders.PROJECT_DIR,
        './node_modules'
    );
    const cliNodeModulesDir = path.resolve(
        configs.folders.CLI_DIR,
        './node_modules'
    );
    const nodeModulesDir = ['node_modules', projectNodeModulesDir, cliNodeModulesDir];
    const presets = [
        [
            path.resolve(cliNodeModulesDir, '@babel/preset-env'),
            {
                modules: false,
                useBuiltIns: 'entry',
                corejs: 3,
                targets: {
                    browsers
                }
            }
        ]
    ];
    const plugins = [
        path.resolve(cliNodeModulesDir, '@babel/plugin-proposal-object-rest-spread'),
        path.resolve(cliNodeModulesDir, '@babel/plugin-syntax-dynamic-import')
    ];
    const cssloaders = [
        isDev
            ? {
                loader: 'vue-style-loader',
                options: {
                    sourceMap: false,
                    shadowMode: false
                }
            }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            },
        {
            loader: 'css-loader',
            options: {
                sourceMap: false,
                importLoaders: 2
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: path.resolve(configs.folders.CLI_DIR, 'build/configs/postcss.config.js')
                },
                sourceMap: false
            }
        }
    ];


    const baseConfig = {

        mode: isDev ? 'development' : 'production',

        context: path.resolve(configs.folders.PROJECT_DIR),

        entry: {
            app: [
                path.resolve(configs.folders.CLI_DIR, './node_modules/babel-polyfill'),
                // path.resolve(configs.folders.CLI_DIR, './build/utils/create-nonce'),
                path.resolve(configs.folders.FES_DIR, './src/app.js')
            ]
        },

        resolve: {
            extensions: ['.js', '.fes', '.vue', '.json'],
            modules: nodeModulesDir,
            alias: {
                projectRoot: configs.folders.PROJECT_DIR,
                '@': path.resolve(configs.folders.PROJECT_DIR, 'src'),
                '@@': path.resolve(configs.folders.FES_DIR, 'src'),
                assets: path.resolve(
                    configs.folders.PROJECT_DIR,
                    './src/assets/'
                ),
                vue$: 'vue/dist/vue.esm.js'
            }
        },

        resolveLoader: {
            modules: nodeModulesDir
        },

        output: {
            globalObject: 'this',
            filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
            chunkFilename: isDev ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].js',
            path: configs.folders.PROJECT_DIST_DIR,
            publicPath: isDev ? '/' : './'
        },

        module: {
            noParse: /^(vue|vue-router|vuex|vuex-router-sync|axios|@webank\/fes-ui)$/,
            rules: [

                /* config.module.rule('vue') */
                {
                    test: /\.vue|fes$/,
                    use: [
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: path.resolve(configs.folders.PROJECT_DIR, 'node_modules/.cache/vue-loader')
                            }
                        },
                        {
                            loader: 'vue-loader',
                            options: {
                                compilerOptions: {
                                    preserveWhitespace: false
                                },
                                cacheDirectory: path.resolve(configs.folders.PROJECT_DIR, 'node_modules/.cache/vue-loader')
                            }
                        }
                    ]
                },

                /* config.module.rule('images') */
                {
                    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 4096,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: isDev ? 'img/[name].[ext]' : 'img/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },

                /* config.module.rule('svg') */
                {
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isDev ? 'img/[name].[ext]' : 'img/[name].[hash:8].[ext]'
                            }
                        }
                    ]
                },

                /* config.module.rule('media') */
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 4096,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: isDev ? 'media/[name].[ext]' : 'media/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },

                /* config.module.rule('fonts') */
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 4096,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: isDev ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },

                /* config.module.rule('css') */
                {
                    test: /\.css$/,
                    use: cssloaders
                },

                /* config.module.rule('postcss') */
                {
                    test: /\.p(ost)?css$/,
                    use: cssloaders
                },

                /* config.module.rule('scss') */
                {
                    test: /\.scss$/,
                    use: cssloaders.concat([
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ])
                },

                /* config.module.rule('sass') */
                {
                    test: /\.sass$/,
                    use: cssloaders.concat([
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false,
                                indentedSyntax: true
                            }
                        }
                    ])
                },

                /* config.module.rule('less') */
                {
                    test: /\.less$/,
                    use: cssloaders.concat([
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: false,
                                javascriptEnabled: true
                            }
                        }
                    ])
                },

                /* config.module.rule('stylus') */
                {
                    test: /\.styl(us)?$/,
                    use: cssloaders.concat([
                        {
                            loader: 'stylus-loader',
                            options: {
                                sourceMap: false,
                                preferPathResolver: 'webpack'
                            }
                        }
                    ])
                },

                /* config.module.rule('js') */
                {
                    test: /\.m?jsx?$/,
                    use: [
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: path.resolve(configs.folders.PROJECT_DIR, 'node_modules/.cache/babel-loader')
                            }
                        },
                        {
                            loader: 'thread-loader'
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                presets,
                                plugins
                            }
                        }
                    ]
                }

            ]
        },

        devtool: isDev && 'cheap-module-eval-source-map',

        plugins: [

            /* config.plugin('progress') */
            new webpack.ProgressPlugin(),

            /* config.plugin('vue-loader') */
            new VueLoaderPlugin(),

            /* config.plugin('define') */
            new webpack.DefinePlugin({
                'process.privateFesEnv': {
                    env: `"${configs.env}"`
                },
                'process.env': {
                    env: JSON.stringify(configs.env),
                    command: JSON.stringify(configs.command)
                }
            }),

            /* config.plugin('clean dist') */
            isBuild && new CleanWebpackPlugin(),

            /* config.plugin('extract-css') */
            isBuild
                 && new MiniCssExtractPlugin({
                     filename: 'css/[name].[contenthash:8].css',
                     chunkFilename: 'css/[name].[contenthash:8].css'
                 }),

            /* config.plugin('Copy static') */
            isBuild
                 && new CopyPlugin([
                     {
                         from: configs.folders.PROJECT_STATIC_DIR,
                         to: path.resolve(
                             configs.folders.PROJECT_DIST_DIR,
                             'static'
                         )
                     }
                 ]),

            /* config.plugin('optimize-css') */
            isBuild
                 && new OptimizeCssnanoPlugin({
                     sourceMap: false,
                     cssnanoOptions: {
                         preset: [
                             'default',
                             {
                                 mergeLonghand: false,
                                 cssDeclarationSorter: false
                             }
                         ]
                     }
                 }),

            /* config.plugin('hash-module-ids') */
            isBuild
                 && new webpack.HashedModuleIdsPlugin({
                     hashDigest: 'hex'
                 }),

            /* config.plugin('固定一下 chunk id') */
            isBuild
                 && new webpack.NamedChunksPlugin((chunk) => {
                     if (chunk.name) {
                         return chunk.name;
                     }
                     // eslint-disable-next-line
                     const hash = require('hash-sum');
                     const joinedHash = hash(
                         Array.from(chunk.modulesIterable, m => m.id).join('_')
                     );
                     return `chunk-${joinedHash}`;
                 }),

            // /* config.plugin('Copyright') */
            // isBuild
            //      && new webpack.BannerPlugin(''),

            /* config.plugin('case-sensitive-paths') */
            new CaseSensitivePathsPlugin(),

            /* config.plugin('friendly-errors') */
            new FriendlyErrorsPlugin(),

            /* config.plugin('index.html') */
            new HtmlPlugin({
                template,
                minify: isBuild && {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    collapseBooleanAttributes: true,
                    removeScriptTypeAttributes: true
                }
            })

        ]
    };

    if (isBuild) {
        baseConfig.optimization = {
            minimizer: [
                new TerserPlugin({
                    test: /\.m?js(\?.*)?$/i,
                    chunkFilter: () => true,
                    warningsFilter: () => true,
                    extractComments: false,
                    sourceMap: true,
                    cache: true,
                    cacheKeys: defaultCacheKeys => defaultCacheKeys,
                    parallel: true,
                    include: undefined,
                    exclude: undefined,
                    minify: undefined,
                    terserOptions: {
                        output: {
                            comments: /^\**!|@preserve|@license|@cc_on/i
                        },
                        compress: {
                            arrows: false,
                            collapse_vars: false,
                            comparisons: false,
                            computed_props: false,
                            hoist_funs: false,
                            hoist_props: false,
                            hoist_vars: false,
                            inline: false,
                            loops: false,
                            negate_iife: false,
                            properties: false,
                            reduce_funcs: false,
                            reduce_vars: false,
                            switches: false,
                            toplevel: false,
                            typeofs: false,
                            booleans: true,
                            if_return: true,
                            sequences: true,
                            unused: true,
                            conditionals: true,
                            dead_code: true,
                            evaluate: true
                        },
                        mangle: {
                            safari10: true
                        }
                    }
                })
            ],
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'chunk-vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'initial'
                    },
                    common: {
                        name: 'chunk-common',
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: true
        };
    }

    baseConfig.plugins = baseConfig.plugins.filter(plu => plu !== false);

    let advancedConfig = {};
    const projectWebpackConfigFile = path.resolve(configs.folders.PROJECT_DIR, 'webpack.config.js');
    if (fs.existsSync(projectWebpackConfigFile)) {
        console.log('[init] 加载项目个性webpack配置文件');
        // eslint-disable-next-line
        advancedConfig = require(projectWebpackConfigFile)(mode, configs, webpack);
    }

    return merge(baseConfig, advancedConfig);
};
