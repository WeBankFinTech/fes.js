import { reactive } from 'vue';


let accessibleElementTags = null;

// TODO 支持异步函数
export const addAccessibleElementTags = (elementTags) => {
    if (accessibleElementTags) {
        if (typeof elementTags === 'string') {
            accessibleElementTags.push(elementTags);
        } else {
            accessibleElementTags.push(...elementTags);
        }
    }
};

// TODO 移除权限 + 支持异步函数
export const delAccessibleElementTags = () => {
    console.log('todo');
};

// 验证一个资源是否可以访问
export const accessibleValidator = (elementTag) => {
    elementTag = elementTag.split('?')[0];
    if (Array.isArray(accessibleElementTags) && accessibleElementTags.length > 0) {
        if (elementTag === '' && accessibleElementTags.includes('/')) return true;
        if (elementTag) {
            for (let i = 0; i < accessibleElementTags.length; i++) {
                if (elementTag === accessibleElementTags[i]) {
                    return true;
                }
                // 支持*匹配
                const reg = new RegExp(`^${accessibleElementTags[i].replace('*', '.+')}$`);
                if (reg.test(elementTag)) {
                    return true;
                }
            }
        }
    }
    return true;
};


export const createPermissionHandler = () => ({
    async install(app, options, ctx) {
        try {
            if (typeof options.accessibleElementTags === 'function') {
                const elementTags = await options.accessibleElementTags(ctx);
                accessibleElementTags = reactive(elementTags || []);
            } else {
                accessibleElementTags = reactive(options.accessibleElementTags || []);
            }
            const elWeakMap = new WeakMap();
            app.directive('permission', (el, binding) => {
                // TODO 当 accessibleElementTags 变更的时候调用 forceUpdate 更新组件
                if (!elWeakMap.has(el)) {
                    elWeakMap.set(el, {
                        display: el.style.display
                    });
                }
                const elementTags = Array.isArray(binding.value) ? binding.value : binding.value;
                if (elementTags.some(elementTag => accessibleValidator(elementTag))) {
                    el.style.display = elWeakMap.get(el).display;
                } else {
                    el.style.display = 'none';
                }
            });

            // TODO 异步权限
            ctx.router.beforeEach(to => accessibleValidator(to.path));

            ctx.accessibleValidator = accessibleValidator;
            ctx.accessibleElementTags = accessibleElementTags;
        } catch (err) {
            console.error(err);
        }
    }
});
