/**
 * Created by harrywan on 2017/6/27.
 */

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssLoaders = (function (options) {
    options = options || {};
    function generateLoaders(loaders) {
        var sourceLoader = loaders
            .map(function (loader) {
                var extraParamChar;
                if (/\?/.test(loader)) {
                    loader = loader.replace(/\?/, '-loader?');
                    extraParamChar = '&';
                } else {
                    loader = loader + '-loader';
                    extraParamChar = '?';
                }
                return (
                    loader +
                    (options.sourceMap ? extraParamChar + 'sourceMap' : '')
                );
            })
            .join('!');

        if (options.extract) {
            return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
        } else {
            return ['vue-style-loader', sourceLoader].join('!');
        }
    }

    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    };
})();

let presets = ['es2015', 'stage-2']
let plugins = ['transform-runtime']
let babelOptions = {
    presets,
    plugins
}
let webpackConfig = {
    entry: {
        app: [path.join(__dirname, '../node_modules/core-js/es5/index'), path.resolve(__dirname, '../src/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'fes-ui.js',
        library: 'fes-ui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [path.join(__dirname, '../node_modules')]
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ...cssLoaders,
                        js: [{
                            loader: 'babel-loader',
                            options: babelOptions
                        }]
                    }
                }
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: []
};
module.exports = webpackConfig;
