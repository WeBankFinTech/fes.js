/**
 * Created by harrywan on 2017/6/27.
 */

let path = require('path'),
    webpackMerge = require('webpack-merge'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    base = require('./webpack.dist.config');
let defaultUglifyjsOptions = {
    uglifyOptions: {
        ie8: false,
        compress: {
            warnings: false,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            negate_iife: false
        },
        output: {
            comments: false,
            beautify: false
        },
        mangle: {
            keep_fnames: true
        }
    },
    parallel: true,
    cache: true
};
module.exports = webpackMerge(base, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'fes-ui.min.js',
        library: 'fes-ui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [new UglifyJsPlugin(defaultUglifyjsOptions)]
});
