import type { IPluginAPI } from '@fesjs/shared';
import type { WebpackBuildConfig } from '../../../shared';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { removeSync } from 'fs-extra/esm';
import getFolderSize from 'get-folder-size';
import { cleanTmpPathExceptCache, getBundleAndConfigs } from '../../common/buildDevUtils';
import connectHistoryMiddleware from './connectHistoryMiddleware';
import { startDevServer } from './devServer';

async function handleCacheClean(cwd: string) {
    return new Promise((resolve) => {
        const cachePath = path.join(cwd, '.cache/webpack');
        if (!fs.existsSync(cachePath)) {
            return resolve(0);
        }
        // 大于 5G 清除缓存，修复 webpack 缓存无限增长问题
        // https://github.com/webpack/webpack/issues/13291
        getFolderSize.loose(cachePath).then((size) => {
            if (size > 5 * 1024 * 1024 * 1024) {
                removeSync(cachePath);
            }
            resolve(size);
        });
    });
}

export default (api: IPluginAPI<WebpackBuildConfig>) => {
    const {
        paths,
        utils: { chalk, getPort, getHostName, changePort, logger },
    } = api;

    let port: number;
    let hostname: string;
    let server: any;

    async function destroy() {
        await server?.stop();
    }

    api.registerCommand({
        command: 'dev',
        description: 'start a local http service for development',
        options: [
            {
                name: '--port',
                description: 'http service port, like 8000',
            },
            {
                name: '--https',
                description: 'whether to turn on the https service',
            },
        ],
        async fn({ args = {} }) {
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
            process.send?.({
                type: 'RESTART',
            });
        },
    });
};
