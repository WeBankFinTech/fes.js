const path = require('path');

async function handleCacheClean(cwd) {
    return new Promise((resolve, reject) => {
        const cachePath = path.join(cwd, '.cache/webpack');
        require('get-folder-size')(cachePath, (err, size) => {
            if (err) {
                return reject(err);
            }
            // 大于 5G 清除缓存，修复 webpack 缓存无限增长问题
            // https://github.com/webpack/webpack/issues/13291
            if (size > 5 * 1024 * 1024 * 1024) {
                require('fs-extra').removeSync(cachePath);
            }
            resolve(size);
        });
    });
}

export default (api) => {
    const {
        paths,
        utils: { chalk, getPort, getHostName, changePort, logger },
    } = api;

    let port;
    let hostname;
    let server;

    async function destroy() {
        await server?.stop();
    }

    api.registerCommand({
        command: 'dev',
        description: 'start a local http service for development',
        options: [
            {
                name: '--port',
                description: 'http service port, like 8080',
            },
            {
                name: '--https',
                description: 'whether to turn on the https service',
            },
        ],
        async fn({ args = {} }) {
            const { cleanTmpPathExceptCache, getBundleAndConfigs } = require('../buildDevUtils');
            const connectHistoryMiddleware = require('./connectHistoryMiddleware').default;
            await handleCacheClean(api.paths.cwd);

            port = await getPort(process.env.PORT || args.port || api.config.devServer?.port);

            changePort(port);

            hostname = getHostName(api.config.devServer?.host);

            // enable https
            const isHTTPS = process.env.HTTPS || args.https || api.config.devServer?.https;

            cleanTmpPathExceptCache({
                absTmpPath: paths.absTmpPath,
            });

            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            await api.startWatch();

            // dev
            const { bundleConfig } = await getBundleAndConfigs({ api });

            const beforeMiddlewares = await api.applyPlugins({
                key: 'addBeforeMiddlewares',
                type: api.ApplyPluginsType.add,
                initialValue: [],
                args: {},
            });
            const middlewares = await api.applyPlugins({
                key: 'addMiddlewares',
                type: api.ApplyPluginsType.add,
                initialValue: [],
                args: {},
            });

            const { startDevServer } = require('./devServer');
            server = startDevServer({
                webpackConfig: bundleConfig,
                host: hostname,
                port,
                proxy: api.config.proxy,
                https: isHTTPS,
                beforeMiddlewares: [connectHistoryMiddleware(api), ...beforeMiddlewares],
                afterMiddlewares: [...middlewares],
                customerDevServerConfig: api.config.devServer,
            });

            return {
                destroy,
            };
        },
    });

    api.registerMethod({
        name: 'restartServer',
        fn() {
            logger.info(chalk.gray('Try to restart dev server...'));
            destroy();
            process.send({
                type: 'RESTART',
            });
        },
    });
};
