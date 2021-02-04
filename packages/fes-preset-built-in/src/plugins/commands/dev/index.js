import assert from 'assert';
import { delay } from '@umijs/utils';
import {
    cleanTmpPathExceptCache,
    getBundleAndConfigs
} from '../../../utils/buildDevUtils';
import generateFiles from '../../../utils/generateFiles';
import { watchPkg } from './watchPkg';

export default (api) => {
    const {
        env,
        paths,
        utils: { chalk, portfinder }
    } = api;

    const unwatchs = [];
    let port;
    let hostname;
    let server;

    function destroy() {
        for (const unwatch of unwatchs) {
            unwatch();
        }
        // eslint-disable-next-line
        server?.listeningApp?.close();
    }

    api.registerCommand({
        command: 'dev',
        description: 'start a local http service for development',
        options: [{
            name: '--port',
            description: 'http service port, like 8080'
        }, {
            name: '--https',
            description: 'whether to turn on the https service'
        }],
        async fn({ args = {} }) {
            const defaultPort = process.env.PORT || args.port || api.config.devServer?.port;
            port = await portfinder.getPortPromise({
                port: defaultPort ? parseInt(String(defaultPort), 10) : 8000
            });
            hostname = process.env.HOST || api.config.devServer?.host || '0.0.0.0';
            console.log(chalk.cyan('Starting the development server...'));
            process.send({
                type: 'UPDATE_PORT',
                port
            });

            // enable https, HTTP/2 by default when using --https
            const isHTTPS = process.env.HTTPS || args.https;

            cleanTmpPathExceptCache({
                absTmpPath: paths.absTmpPath
            });
            const watch = process.env.WATCH !== 'none';

            // generate files
            const unwatchGenerateFiles = await generateFiles({
                api,
                watch
            });
            if (unwatchGenerateFiles) unwatchs.push(unwatchGenerateFiles);

            if (watch) {
                // watch pkg changes
                const unwatchPkg = watchPkg({
                    cwd: api.cwd,
                    onChange() {
                        console.log();
                        api.logger.info('Plugins in package.json changed.');
                        api.restartServer();
                    }
                });
                unwatchs.push(unwatchPkg);

                // watch config change
                const unwatchConfig = api.service.configInstance.watch({
                    userConfig: api.service.userConfig,
                    onChange: async ({ pluginChanged, valueChanged }) => {
                        if (pluginChanged.length) {
                            console.log();
                            api.logger.info(
                                `Plugins of ${pluginChanged
                                    .map(p => p.key)
                                    .join(', ')} changed.`
                            );
                            api.restartServer();
                        }
                        if (valueChanged.length) {
                            let reload = false;
                            let regenerateTmpFiles = false;
                            const fns = [];
                            const reloadConfigs = [];
                            valueChanged.forEach(({ key, pluginId }) => {
                                const { onChange } = api.service.plugins[pluginId].config || {};
                                if (
                                    onChange
                                    === api.ConfigChangeType.regenerateTmpFiles
                                ) {
                                    regenerateTmpFiles = true;
                                }
                                if (
                                    !onChange
                                    || onChange === api.ConfigChangeType.reload
                                ) {
                                    reload = true;
                                    reloadConfigs.push(key);
                                }
                                if (typeof onChange === 'function') {
                                    fns.push(onChange);
                                }
                            });

                            if (reload) {
                                console.log();
                                api.logger.info(
                                    `Config ${reloadConfigs.join(
                                        ', '
                                    )} changed.`
                                );
                                api.restartServer();
                            } else {
                                api.service.userConfig = api.service.configInstance.getUserConfig();

                                await api.setConfig();

                                if (regenerateTmpFiles) {
                                    await generateFiles({
                                        api
                                    });
                                } else {
                                    fns.forEach(fn => fn());
                                }
                            }
                        }
                    }
                });
                unwatchs.push(unwatchConfig);
            }

            // delay dev server 启动，避免重复 compile
            // https://github.com/webpack/watchpack/issues/25
            // https://github.com/yessky/webpack-mild-compile
            await delay(500);

            // dev
            const {
                bundler,
                bundleConfigs,
                bundleImplementor
            } = await getBundleAndConfigs({
                api,
                port
            });
            const opts = bundler.setupDevServerOpts({
                bundleConfigs,
                bundleImplementor
            });

            const beforeMiddlewares = await api.applyPlugins({
                key: 'addBeforeMiddlewares',
                type: api.ApplyPluginsType.add,
                initialValue: [],
                args: {}
            });
            const middlewares = await api.applyPlugins({
                key: 'addMiddlewares',
                type: api.ApplyPluginsType.add,
                initialValue: [],
                args: {}
            });

            const { Server } = require('@umijs/server');

            server = new Server({
                ...opts,
                compress: true,
                https: !!isHTTPS,
                headers: {
                    'access-control-allow-origin': '*'
                },
                proxy: api.config.proxy,
                beforeMiddlewares,
                afterMiddlewares: [...middlewares],
                ...(api.config.devServer || {})
            });
            const listenRet = await server.listen({
                port,
                hostname
            });
            return {
                ...listenRet,
                destroy
            };
        }
    });

    api.registerMethod({
        name: 'getPort',
        fn() {
            assert(
                env === 'development',
                'api.getPort() is only valid in development.'
            );
            return port;
        }
    });

    api.registerMethod({
        name: 'getHostname',
        fn() {
            assert(
                env === 'development',
                'api.getHostname() is only valid in development.'
            );
            return hostname;
        }
    });

    api.registerMethod({
        name: 'getServer',
        fn() {
            assert(
                env === 'development',
                'api.getServer() is only valid in development.'
            );
            return server;
        }
    });

    api.registerMethod({
        name: 'restartServer',
        fn() {
            console.log(chalk.gray('Try to restart dev server...'));
            destroy();
            process.send({
                type: 'RESTART'
            });
        }
    });
};
