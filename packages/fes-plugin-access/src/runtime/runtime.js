import { plugin, ApplyPluginsType } from '@@/core/coreExports';
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
        }
        let path;
        if (to.matched.length === 1) {
            path = to.matched[0].path;
        } else {
            path = to.path;
        }
        const canRoute = await access.hasAccess(path);
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
