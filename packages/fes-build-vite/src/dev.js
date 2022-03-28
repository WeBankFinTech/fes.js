import { createServer } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import SFCConfigBlockPlugin from './SFCConfigBlockPlugin';

export default (api) => {
    const {
        paths,
        utils: { chalk },
    } = api;

    const unwatchs = [];
    let server;

    function destroy() {
        for (const unwatch of unwatchs) {
            unwatch();
        }
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
        async fn() {
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
                    port: 8000,
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
