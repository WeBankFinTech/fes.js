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
