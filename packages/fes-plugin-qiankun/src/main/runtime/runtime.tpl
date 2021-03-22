// import { deferred } from '@@/plugin-qiankun/qiankunDefer.js';
// import '@@/plugin-qiankun/qiankunRootExports.js';
// import subAppConfig from '@@/plugin-qiankun/subAppsConfig.json';
// import { registerMicroApps, start } from 'qiankun';
// import { createApp, h } from 'vue';
// import { plugin, ApplyPluginsType } from '@@/core/coreExports';
// import { defaultMountContainerId, testPathWithPrefix, toArray } from '../common';

// async function getMasterRuntime() {
//     const config = plugin.applyPlugins({
//         key: 'qiankun',
//         type: ApplyPluginsType.modify,
//         initialValue: {},
//         async: true
//     });
//     const { master } = config;
//     return master || config;
// }

// export async function render(oldRender) {
//     oldRender();
//     function isAppActive(location, history, base) {
//         const baseConfig = toArray(base);
//         switch (history.type || history) {
//             case 'hash':
//                 return baseConfig.some(pathPrefix => testPathWithPrefix(`#${pathPrefix}`, location.hash));
//             case 'browser':
//                 return baseConfig.some(pathPrefix => testPathWithPrefix(pathPrefix, location.pathname));
//             default:
//                 return false;
//         }
//     }
//     const runtimeConfig = await getMasterRuntime();
//     const {
//         apps, jsSandbox = false, prefetch = true, defer = false, lifeCycles, masterHistory, ...otherConfigs
//     } = {
//         ...subAppConfig,
//         ...runtimeConfig
//     };

//     assert(apps && apps.length, 'sub apps must be config when using fes-plugin-qiankun');

//     registerMicroApps(apps.map(({
//         name, entry, base, history = masterHistory, mountElementId = defaultMountContainerId, props
//     }) => ({
//         name,
//         entry,
//         activeRule: location => isAppActive(location, history, base),
//         render: ({ appContent, loading }) => {
//             if (process.env.NODE_ENV === 'development') {
//                 console.info(`app ${name} loading ${loading}`);
//             }
//             if (mountElementId) {
//                 const container = document.getElementById(mountElementId);
//                 if (container) {
//                     const subApp = {
//                         setup() {

//                         },
//                         render() {
//                             h('div', {
//                                 dangerouslySetInnerHTML: {
//                                     __html: appContent
//                                 }
//                             });
//                         }
//                     };
//                     const app = createApp();
//                     app.mount(subApp, container);
//                 }
//             }
//         },
//         props: {
//             base,
//             history,
//             ...props
//         }
//     })), lifeCycles);

//     if (defer) {
//         await deferred.promise;
//     }

//     start({ jsSandbox, prefetch, ...otherConfigs });
// }
