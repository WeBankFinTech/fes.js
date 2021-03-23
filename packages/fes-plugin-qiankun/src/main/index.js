import { readFileSync } from 'fs';
import { join } from 'path';
import { defaultMainRootId, defaultHistoryType } from '../constants';
import modifyRoutes from './modifyRoutes';

const namespace = 'plugin-qiankun/main';

export function isMasterEnable(api) {
    return (
        !!api.userConfig?.qiankun?.main
      || !!process.env.INITIAL_QIANKUN_MAIN_OPTIONS
    );
}

export default function (api) {
    api.describe({
        enableBy: () => isMasterEnable(api)
    });

    api.modifyDefaultConfig(config => ({
        ...config,
        mountElementId: defaultMainRootId
    }));

    modifyRoutes({ api, namespace });

    const absMicroAppPath = join(namespace, 'MicroApp.js');
    const absRuntimePath = join(namespace, 'runtime.js');
    const absMasterOptionsPath = join(namespace, 'masterOptions.js');
    const absGetMicroAppRouteCompPath = join(namespace, 'getMicroAppRouteComponent.js');

    api.onGenerateFiles(() => {
        api.writeTmpFile({
            path: absMicroAppPath,
            content: readFileSync(join(__dirname, 'runtime/MicroApp.tpl'), 'utf-8')
        });

        api.writeTmpFile({
            path: absRuntimePath,
            content: readFileSync(join(__dirname, 'runtime/runtime.tpl'), 'utf-8')
        });

        api.writeTmpFile({
            path: absGetMicroAppRouteCompPath,
            content: readFileSync(join(__dirname, 'runtime/getMicroAppRouteComponent.tpl'), 'utf-8')
        });

        const { main: options } = api.config?.qiankun || {};
        const masterHistoryType = api.config?.router?.mode || defaultHistoryType;
        const base = api.config.base || '/';
        api.writeTmpFile({
            path: absMasterOptionsPath,
            content: `
            let options = ${JSON.stringify({
        masterHistoryType,
        base,
        ...options
    })};
            export const getMasterOptions = () => options;
            export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
            `
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['MicroApp'],
            source: absMicroAppPath
        }
    ]);

    api.addPluginExports(() => [
        {
            specifiers: ['getMicroAppRouteComponent'],
            source: absGetMicroAppRouteCompPath
        }
    ]);


    // const { registerRuntimeKeyInIndex = false } = options || {};

    // api.addRuntimePlugin(() => require.resolve('./runtime'));

    // if (!registerRuntimeKeyInIndex) {
    //     api.addRuntimePluginKey(() => 'qiankun');
    // }

    // api.modifyDefaultConfig(config => ({
    //     ...config,
    //     mountElementId: defaultMainRootId,
    //     disableGlobalVariables: true
    // }));

    // // apps 可能在构建期为空
    // const { apps = [] } = options || {};
    // if (apps.length) {
    //     // 获取一组路由中以 basePath 为前缀的路由
    //     const findRouteWithPrefix = (routes, basePath) => {
    //         for (const route of routes) {
    //             if (route.path && testPathWithPrefix(basePath, route.path)) { return route; }

    //             if (route.routes && route.routes.length) {
    //                 return findRouteWithPrefix(route.routes, basePath);
    //             }
    //         }

    //         return null;
    //     };

    //     const modifyAppRoutes = () => {
    //         // TODO: fes缺少修改路由API
    //         api.modifyRoutes((routes) => {
    //             const {
    //                 config: { history: mainHistory = defaultHistoryMode }
    //             } = api;

    //             const newRoutes = routes.map((route) => {
    //                 if (route.path === '/' && route.routes && route.routes.length) {
    //                     apps.forEach(({ history: slaveHistory = 'history', base }) => {
    //                         // 当子应用的 history mode 跟主应用一致时，为避免出现 404 手动为主应用创建一个 path 为 子应用 rule 的空 div 路由组件
    //                         if (slaveHistory === mainHistory) {
    //                             const baseConfig = toArray(base);

    //                             baseConfig.forEach((basePath) => {
    //                                 const routeWithPrefix = findRouteWithPrefix(routes, basePath);

    //                                 // 应用没有自己配置过 basePath 相关路由，则自动加入 mock 的路由
    //                                 if (!routeWithPrefix) {
    //                                     route.routes.unshift({
    //                                         path: basePath,
    //                                         exact: false,
    //                                         component: `() => {
    //                                             if (process.env.NODE_ENV === 'development') {
    //                                             console.log('${basePath} 404 mock rendered');
    //                                             }

    //                                             return React.createElement('div');
    //                                         }`
    //                                     });
    //                                 } else {
    //                                     // 若用户已配置过跟应用 base 重名的路由，则强制将该路由 exact 设置为 false，目的是兼容之前遗留的错误用法的场景
    //                                     routeWithPrefix.exact = false;
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }

    //                 return route;
    //             });

    //             return newRoutes;
    //         });
    //     };

    //     modifyAppRoutes();
    // }

    // const rootExportsFile = join(api.paths.absSrcPath, 'rootExports.js');

    // api.addTmpGenerateWatcherPaths(() => rootExportsFile);

    // const namespace = 'plugin-qiankun';
    // const absCoreFilePath = join(namespace, 'qiankunDefer.js');

    // api.onGenerateFiles(() => {
    //     const {
    //         config: { history = defaultHistoryMode }
    //     } = api;
    //     const rootExports = `window.g_rootExports = ${existsSync(rootExportsFile) ? 'require(\'@/rootExports\')' : '{}'};`.trim();

    //     api.writeTmpFile({
    //         path: `${namespace}/qiankunRootExports.js`,
    //         content: rootExports
    //     });

    //     api.writeTmpFile({
    //         path: `${namespace}/subAppsConfig.json`,
    //         content: JSON.stringify({
    //             mainHistory: history,
    //             ...options
    //         })
    //     });

    //     api.writeTmpFile({
    //         path: `${namespace}/qiankunDefer.js`,
    //         content: `
    //                 class Deferred {
    //                     constructor() {
    //                     this.promise = new Promise(resolve => this.resolve = resolve);
    //                     }
    //                 }
    //                 export const deferred = new Deferred();
    //                 export const qiankunStart = deferred.resolve;
    //             `.trim()
    //     });

    //     api.writeTmpFile({
    //         path: `${namespace}/runtime.js`,
    //         content: readFileSync(join(__dirname, 'runtime.js'), 'utf-8')
    //     });
    // });

    // api.addPluginExports(() => [
    //     {
    //         specifiers: ['qiankunStart'],
    //         source: absCoreFilePath
    //     }
    // ]);
}
