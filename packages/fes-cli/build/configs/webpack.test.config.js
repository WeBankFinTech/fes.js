const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isCoverage = process.env.NODE_ENV === 'coverage';

const generateConfig = require('../helpers/config');

const configs = generateConfig();

const webpackConfig = {
    mode: 'development',
    output: {
        path: configs.folders.PROJECT_DIST_DIR,
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
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
            'node_modules',
            path.join(configs.folders.CLI_DIR, 'node_modules'),
            path.join(configs.folders.PROJECT_DIR, 'node_modules')
        ]
    },
    externals: [nodeExternals()],
    module: {
        rules: [].concat(
            isCoverage
                ? {
                    test: /\.js$/,
                    include: path.resolve('packages'), // instrument only testing sources with Istanbul, after ts-loader runs
                    loader: 'istanbul-instrumenter-loader',
                    query: {
                        esModules: true
                    }
                }
                : [],
            {
                test: /\.(jsx?|babel|es6)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
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
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        )
    },
    plugins: [new VueLoaderPlugin(), new ProgressBarPlugin()],
    target: 'node',
    devtool: 'inline-cheap-module-source-map'
};

module.exports = webpackConfig;
