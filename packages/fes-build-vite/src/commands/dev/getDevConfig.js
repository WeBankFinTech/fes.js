import { getInnerCommonConfig } from '../../common/getConfig';
import viteMiddlewarePlugin from './viteMiddlewarePlugin';

export default async (api, args) => {
    const { deepmerge, getPort, changePort, getHostName } = api.utils;

    const port = await getPort(args.port || api.config.viteOption.server?.port);
    changePort(port);

    const hostname = getHostName(api.config.viteOption.server?.host);

    const { server } = api.config.viteOption;

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

    return deepmerge(
        {
            mode: 'development',
            plugins: [viteMiddlewarePlugin(beforeMiddlewares, middlewares)],
            server: {
                ...server,
                port,
                host: hostname,
                https: process.env.HTTPS || args.https,
            },
        },
        getInnerCommonConfig(api),
    );
};
