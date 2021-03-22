// import { h } from 'vue';
// import qiankunRender from './lifecycles';

// export function rootContainer(container) {
//     const value = typeof window !== 'undefined' ? window.g_rootExports : {};
//     const { Context } = require('@@/plugin-qiankun/qiankunContext');
//     return h(Context.Provider, { value }, container);
// }

// export const render = oldRender => qiankunRender().then(() => {
//     oldRender();
// });
