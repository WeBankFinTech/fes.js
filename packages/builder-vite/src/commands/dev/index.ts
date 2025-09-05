import type { IPluginAPI } from '@fesjs/shared';
import type { ViteDevServer } from 'vite';
import process from 'node:process';
import { createServer } from 'vite';
import getDevConfig from './getDevConfig';

interface Args {
    args?: Record<string, any>;
    rawArgv?: Record<string, any>;
    options?: Record<string, any>;
    program?: any;
}

export default (api: IPluginAPI) => {
    const {
        paths,
        utils: { chalk, rimraf },
    } = api;

    let server: ViteDevServer | undefined;

    function destroy() {
        if (server) {
            server.close().catch(() => {});
        }
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
        async fn({ args = {} }: Args) {
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
            // eslint-disable-next-line no-console
            console.log(chalk.gray('Try to restart dev server...'));
            destroy();
            if (typeof process !== 'undefined' && process.send) {
                process.send({
                    type: 'RESTART',
                });
            }
        },
    });
};
