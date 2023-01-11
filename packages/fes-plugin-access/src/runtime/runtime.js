// eslint-disable-next-line import/no-unresolved
import { plugin, ApplyPluginsType } from '@@/core/coreExports';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { access, install } from './core';

export function onRouterCreated({ router }) {
    router.beforeEach(async (to, from, next) => {
        const runtimeConfig = plugin.applyPlugins({
            key: 'access',
            type: ApplyPluginsType.modify,
            initialValue: {},
        });
        if (to.matched.length === 0) {
            if (runtimeConfig.noFoundHandler && typeof runtimeConfig.noFoundHandler === 'function') {
                return runtimeConfig.noFoundHandler({
                    router,
                    to,
                    from,
                    next,
                });
            }
            return next(false);
        }
        if (Array.isArray(runtimeConfig.ignoreAccess)) {
            const isIgnored = await access.match(to.matched[to.matched.length - 1].path, runtimeConfig.ignoreAccess);
            if (isIgnored) {
                return next();
            }
        }
        // path是匹配路由的path，不是页面hash
        const canRoute = await access.hasAccess(to.matched[to.matched.length - 1].path);
        if (canRoute) {
            return next();
        }
        if (runtimeConfig.unAccessHandler && typeof runtimeConfig.unAccessHandler === 'function') {
            return runtimeConfig.unAccessHandler({
                router,
                to,
                from,
                next,
            });
        }
        next(false);
    });
}

export function onAppCreated({ app }) {
    install(app);
}
