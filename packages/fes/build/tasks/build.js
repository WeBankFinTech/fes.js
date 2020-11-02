const webpack = require('webpack');
const log = require('../helpers/log');
const createProdConfig = require('../configs/webpack.config');

const generateRoute = require('./route');

function startBuild(config) {
    try {
        generateRoute(config);
        const webpackConfig = createProdConfig(config, webpack, 'build');
        webpack(webpackConfig, (err) => {
            if (err) {
                log.error(err);
                return;
            }
            console.log('[build] success');
        });
    } catch (e) {
        log.error(e);
    }
}

module.exports = startBuild;
