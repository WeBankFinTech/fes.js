const
    http = require('http');
const webpack = require('webpack');
const express = require('express');
const opn = require('opn');
const path = require('path');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const initMock = require('../mock/init.js');


module.exports = function createDevServer(port, defaultConfig) {
    const hotMiddlewarePath = require.resolve('webpack-hot-middleware');
    defaultConfig.entry.app.unshift(`${hotMiddlewarePath.replace(path.basename(hotMiddlewarePath), '')}client?reload=true`);
    defaultConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    defaultConfig.plugins.push(new webpack.NamedModulesPlugin());

    const app = express();
    const compiler = webpack(defaultConfig);

    // devServer 自带支持，添加自定义插件。
    app.use(webpackDevMiddleware(compiler, {
        lazy: false,
        logLevel: 'silent',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: {
            colors: true,
            chunks: false,
            timings: true
        },
        publicPath: defaultConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: false
    }));
    app.use('/static', express.static('src/static'));


    // 初始化Mock数据
    initMock(app);

    opn(`http://localhost:${port}`);

    http.createServer(app).listen(port);
};
