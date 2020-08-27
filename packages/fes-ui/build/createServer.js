const path = require('path');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const initMock = require('./mock/init.js');

module.exports = function (demand) {
    const app = express();
    var webpackConfig = require('./webpack.dist.config.js');
    var webpackDevConfig = require('./webpack.examples.config.js')(demand);
    Object.keys(webpackDevConfig.entry).forEach(name => {
        webpackDevConfig.entry[name].unshift(
            'webpack-hot-middleware/client?reload=true'
        );
    });
    Object.keys(webpackConfig.entry).forEach(name => {
        webpackConfig.entry[name].unshift(
            'webpack-hot-middleware/client?reload=true'
        );
    });
    webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    var compiler = webpack(webpackDevConfig);
    var uiCompiler = webpack(webpackConfig);
    var webpackDevInstance = webpackDevMiddleware(compiler, {
        contentBase: path.join(__dirname, '../examples', 'images'),
        hot: true,
        https: false,
        lazy: false,
        stats: {
            colors: true,
            chunks: false,
            timings: true
        },
        publicPath: '/',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        overlay: true,
        watchContentBase: true
    });
    var webpackUiInstance = webpackDevMiddleware(uiCompiler, {
        contentBase: path.join(__dirname, '../src'),
        hot: true,
        https: false,
        lazy: false,
        stats: {
            colors: true,
            chunks: false,
            timings: true
        },
        publicPath: '/',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        overlay: true,
        watchContentBase: true
    });
    // devServer 自带支持，添加自定义插件。
    app.use(webpackDevInstance);
    app.use(webpackUiInstance);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackHotMiddleware(uiCompiler));

    // 初始化Mock数据
    initMock(app);
    
    return app;
};
