export default (api) => {
    const {
        paths,
        utils: { chalk, getPort, getHostName, changePort },
    } = api;

    const unwatchs = [];
    let port;
    let hostname;
    let server;

    async function destroy() {
        for (const unwatch of unwatchs) {
            unwatch();
        }
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

            port = await getPort(args.port || api.config.devServer?.port);
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

            api.startWatch();

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
            console.log(chalk.gray('Try to restart dev server...'));
            destroy();
            process.send({
                type: 'RESTART',
            });
        },
    });
};
