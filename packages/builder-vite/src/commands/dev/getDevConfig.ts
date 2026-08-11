import type { IPluginAPI } from '@fesjs/shared';
import type { InlineConfig } from 'vite';
import process from 'node:process';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { getInnerCommonConfig } from '../../common/getConfig';
import viteMiddlewarePlugin from './viteMiddlewarePlugin';

interface Args {
    port?: string | number;
    https?: boolean;
    [key: string]: any;
}

export default async (api: IPluginAPI, args: Args): Promise<InlineConfig> => {
    const { deepmerge, getPort, changePort, getHostName } = api.utils;

    const viteOption = api.config.vite || api.config.viteOption || {};

    const port = await getPort(process.env.PORT || args.port || viteOption.server?.port);
    changePort(port);

    const hostname = getHostName(viteOption.server?.host);

    const { server } = viteOption;

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

    const isHTTPS = !!(process.env.HTTPS || args.https || viteOption.server?.https);

    const bundleConfig: InlineConfig = deepmerge(getInnerCommonConfig(api), {
        mode: 'development',
        plugins: [viteMiddlewarePlugin(beforeMiddlewares, middlewares), isHTTPS && basicSsl()].filter(Boolean),
        server: {
            ...server,
            proxy: server?.proxy || api.config.proxy,
            port,
            host: hostname,
            https: isHTTPS,
        },
    });

    return api.applyPlugins({
        type: api.ApplyPluginsType.modify,
        key: 'modifyBundleConfig',
        initialValue: bundleConfig,
        args: {},
    });
};
