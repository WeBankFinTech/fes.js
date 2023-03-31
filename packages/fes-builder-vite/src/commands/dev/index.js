import { createServer } from 'vite';
import getDevConfig from './getDevConfig';

export default (api) => {
    const {
        paths,
        utils: { chalk, rimraf },
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

            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            await api.startWatch();

            server = await createServer(await getDevConfig(api, args));
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
