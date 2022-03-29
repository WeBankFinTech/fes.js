import { createServer } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import SFCConfigBlockPlugin from '../SFCConfigBlockPlugin';

/**
 * TODO
 * 支持 https
 * 如何处理 html
 * dev 模式 port、https、css modules等能力和  webpack 对齐
 * proxy
 *      createRouteMiddleware 能力
 * 确认 mock mountElementId 能用
 * 其他插件如何对内部配置进行修改
 */

export default (api) => {
    const {
        paths,
        utils: { chalk, rimraf, getPort, changePort, getHostName },
    } = api;

    let server;

    function destroy() {
        server?.close();
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
            rimraf.sync(paths.absTmpPath);

            const port = await getPort(args.port || api.config.viteOption?.server?.port);
            changePort(port);

            const hostname = getHostName(api.config.viteOption?.server?.host);

            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            api.startWatch();

            server = await createServer({
                mode: 'development',
                plugins: [vue(), SFCConfigBlockPlugin, vueJsx()],
                configFile: false,
                resolve: {
                    alias: {
                        '@': paths.absSrcPath,
                        '@@': paths.absTmpPath,
                        '@fesInner': '/',
                    },
                },
                server: {
                    port,
                    host: hostname,
                    https: process.env.HTTPS || args.https,
                },
            });
            await server.listen();

            server.printUrls();

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
