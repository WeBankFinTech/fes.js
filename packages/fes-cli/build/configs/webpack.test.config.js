const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const generateConfig = require('../helpers/config');

const configs = generateConfig();

const presets = [
    [
        require.resolve('@babel/preset-env'),
        {
            modules: false
        }
    ]
];
const plugins = [
    [
        require.resolve('@babel/plugin-transform-runtime'),
        {
            corejs: {
                version: 3,
                proposals: true
            },
            useESModules: true,
            absoluteRuntime: configs.folders.CLI_DIR // 这里是指fes-cli的目录
        }
    ],
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-syntax-dynamic-import')
];

const cssloaders = [
    {
        loader: require.resolve('vue-style-loader'),
        options: {
            sourceMap: false,
            shadowMode: false
        }
    },
    {
        loader: require.resolve('css-loader'),
        options: {
            sourceMap: false,
            importLoaders: 2
        }
    }
];

const webpackConfig = {
    mode: 'development',
    output: {
        path: configs.folders.PROJECT_DIST_DIR,
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.fes', '.json'],
        alias: {
            projectRoot: configs.folders.PROJECT_DIR,
            '@': path.resolve(configs.folders.PROJECT_DIR, 'src'),
            '@@': path.resolve(configs.folders.FES_DIR, 'src'),
            assets: path.resolve(configs.folders.PROJECT_DIR, './src/assets/'),
            vue$: 'vue/dist/vue.esm.js'
        },
        modules: [
            path.join(configs.folders.CLI_DIR, 'node_modules'),
            path.join(configs.folders.PROJECT_DIR, 'node_modules'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(configs.folders.PROJECT_DIR, 'src'), // instrument only testing sources with Istanbul, after ts-loader runs
                loader: 'istanbul-instrumenter-loader',
                query: {
                    esModules: true
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets,
                        plugins
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    },
                    optimizeSSR: false
                }
            },
            /* config.module.rule('images') */
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[ext]'
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
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            },

            /* config.module.rule('media') */
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: require.resolve('file-loader'),
                                options: {
                                    name: 'media/[name].[ext]'
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
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: require.resolve('file-loader'),
                                options: {
                                    name: 'fonts/[name].[ext]'
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

            /* config.module.rule('scss') */
            {
                test: /\.scss$/,
                use: cssloaders.concat([
                    {
                        loader: require.resolve('sass-loader'),
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
                        loader: require.resolve('sass-loader'),
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
                        loader: require.resolve('less-loader'),
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
                        loader: require.resolve('stylus-loader'),
                        options: {
                            sourceMap: false,
                            preferPathResolver: 'webpack'
                        }
                    }
                ])
            }
        ]
    },
    plugins: [new VueLoaderPlugin(), new ProgressBarPlugin()],
    devtool: '#inline-source-map'
};

module.exports = webpackConfig;
