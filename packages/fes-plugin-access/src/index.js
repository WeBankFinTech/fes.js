// import { reactive } from 'vue';


// let accessElementTags = null;

// // TODO 支持异步函数
// export const addAccessElementTags = (elementTags) => {
//     if (accessElementTags) {
//         if (typeof elementTags === 'string') {
//             accessElementTags.push(elementTags);
//         } else {
//             accessElementTags.push(...elementTags);
//         }
//     }
// };

// // TODO 移除权限 + 支持异步函数
// export const delAccessElementTags = () => {
//     console.log('todo');
// };

// // 验证一个资源是否可以访问
// export const accessValidator = (elementTag) => {
//     elementTag = elementTag.split('?')[0];
//     if (Array.isArray(accessElementTags) && accessElementTags.length > 0) {
//         if (elementTag === '' && accessElementTags.includes('/')) return true;
//         if (elementTag) {
//             for (let i = 0; i < accessElementTags.length; i++) {
//                 if (elementTag === accessElementTags[i]) {
//                     return true;
//                 }
//                 // 支持*匹配
//                 const reg = new RegExp(`^${accessElementTags[i].replace('*', '.+')}$`);
//                 if (reg.test(elementTag)) {
//                     return true;
//                 }
//             }
//         }
//     }
//     return true;
// };


// export const createAccessHandler = () => ({
//     async install(app, options, ctx) {
//         try {
//             if (typeof options.accessElementTags === 'function') {
//                 const elementTags = await options.accessElementTags(ctx);
//                 accessElementTags = reactive(elementTags || []);
//             } else {
//                 accessElementTags = reactive(options.accessElementTags || []);
//             }
//             const elWeakMap = new WeakMap();
//             app.directive('access', (el, binding) => {
//                 // TODO 当 accessElementTags 变更的时候调用 forceUpdate 更新组件
//                 if (!elWeakMap.has(el)) {
//                     elWeakMap.set(el, {
//                         display: el.style.display
//                     });
//                 }
//                 const elementTags = Array.isArray(binding.value) ? binding.value : binding.value;
//                 if (elementTags.some(elementTag => accessValidator(elementTag))) {
//                     el.style.display = elWeakMap.get(el).display;
//                 } else {
//                     el.style.display = 'none';
//                 }
//             });

//             // TODO 异步权限
//             ctx.router.beforeEach(to => accessValidator(to.path));

//             ctx.accessValidator = accessValidator;
//             ctx.accessElementTags = accessElementTags;
//         } catch (err) {
//             console.error(err);
//         }
//     }
// });
import { readFileSync } from 'fs';
import { join } from 'path';

const namespace = 'plugin-access';

export default (api) => {
    const {
        utils: { Mustache }
    } = api;

    api.addRuntimePluginKey(() => 'access');

    const absoluteFilePath = join(namespace, 'core.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(() => {
        // 文件写出
        const { roles = {} } = api.config.access || {};

        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'template/core.tpl'), 'utf-8'), {
                REPLACE_ROLES: JSON.stringify(roles)
            })
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: readFileSync(join(__dirname, 'template/runtime.tpl'), 'utf-8')
        });
    });

    // api.addPluginExports(() => [
    //     {
    //         exportAll: true,
    //         source: absoluteFilePath
    //     }
    // ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
