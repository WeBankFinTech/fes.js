const webpack = require('webpack');
const log = require('../helpers/log');
const createProdConfig = require('../configs/webpack.config');

const generateRoute = require('./route');
const generateComponent = require('./components');

function startBuild(config) {
    try {
        generateRoute(config);
        generateComponent(config);
        const webpackConfig = createProdConfig(config, webpack, 'build');
        webpack(webpackConfig, (err) => {
            if (err) {
                log.error(JSON.stringify(err));
                return;
            }
            log.message('执行build成功');
        });
    } catch (e) {
        log.message('执行build失败：');
        log.error(JSON.stringify(e));
    }
}

module.exports = startBuild;
