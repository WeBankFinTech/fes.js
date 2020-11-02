
const webpack = require('webpack');
const { ServiceWithBuiltIn } = require('@webank/fes-core');
const { yParser } = require('@umijs/utils');
const getPkg = require('../helpers/getPkg');
const getCwd = require('../helpers/getCwd');
const createDevServer = require('../helpers/createDevServer');
const getPort = require('../helpers/getPort');
const log = require('../helpers/log');
const createDevConfig = require('../configs/webpack.config');

const args = yParser(process.argv.slice(2));


// TODO 监听 pages 等文件变更重新编译
async function startDev(config) {
    const service = new ServiceWithBuiltIn({
        cwd: getCwd(),
        pkg: getPkg(process.cwd())
    });
    await service.run({
        name: 'dev',
        args
    });


    const webpackConfig = createDevConfig(config, webpack, 'dev');
    if (!webpackConfig) return;

    getPort(config.port)
        .then((port) => {
            log.message(`------------ find port success. port: ${port}`);
            createDevServer(port, webpackConfig);
        }).catch((err) => {
            log.message('------------ build error.');
            log.error(err);
        });
}

module.exports = startDev;
