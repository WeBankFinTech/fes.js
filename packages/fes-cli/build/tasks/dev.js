const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const createDevServer = require('../helpers/createDevServer');
const getPort = require('../helpers/getPort');
const log = require('../helpers/log');
const createDevConfig = require('../configs/webpack.config');

const generateRoute = require('./route');
const generateComponent = require('./components');


function routeHandle(config) {
    generateRoute(config);
    // 监听pages变化重新生成路由
    const pagesWatcher = chokidar.watch(path.resolve(config.folders.PROJECT_DIR, './src/pages'));
    pagesWatcher.on('ready', () => {
        pagesWatcher.on('add', (filePath) => {
            if (path.extname(filePath) === '.fes' || path.extname(filePath) === '.vue') {
                generateRoute(config);
            }
        }).on('unlink', (filePath) => {
            if (path.extname(filePath) === '.fes' || path.extname(filePath) === '.vue') {
                generateRoute(config);
            }
        });
    });
}

function globalComponentHandle(config) {
    generateComponent(config);
    // 监听components变化重新生成组件注入文件
    const compWatcher = chokidar.watch(path.resolve(config.folders.PROJECT_DIR, './src/components'));
    compWatcher.on('ready', () => {
        compWatcher.on('add', (filePath) => {
            if (path.extname(filePath) === '.fes' || path.extname(filePath) === '.vue') {
                generateComponent(config);
            }
        }).on('unlink', (filePath) => {
            if (path.extname(filePath) === '.fes' || path.extname(filePath) === '.vue') {
                generateComponent(config);
            }
        });
    });
}

function startDev(config) {
    routeHandle(config);
    globalComponentHandle(config);
    const webpackConfig = createDevConfig(config, webpack, 'dev');
    if (!webpackConfig) return;

    getPort(config.ports.server)
        .then((port) => {
            log.message(`------------ find port success. port: ${port}`);
            createDevServer(port, webpackConfig);
        }).catch((err) => {
            log.message('------------ build error.');
            log.error(err);
        });
}

module.exports = startDev;
