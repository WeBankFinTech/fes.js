import basicSsl from '@vitejs/plugin-basic-ssl';
import { getInnerCommonConfig } from '../../common/getConfig';
import viteMiddlewarePlugin from './viteMiddlewarePlugin';

export default async (api, args) => {
    const { deepmerge, getPort, changePort, getHostName } = api.utils;

    const port = await getPort(process.env.PORT || args.port || api.config.viteOption.server?.port);
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

    const isHTTPS = !!(process.env.HTTPS || args.https);

    const bundleConfig = deepmerge(getInnerCommonConfig(api), {
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
