import { plugin, ApplyPluginsType } from '@@/core/coreExports';
import { access, install } from './core';

export function onRouterCreated({ router }) {
    router.beforeEach(async (to, from, next) => {
        let path;
        if (to.matched.length === 1) {
            path = to.matched[0].path;
        } else {
            path = to.path;
        }
        const canRoute = await access.hasAccess(path);
        if (canRoute) {
            next();
        } else {
            const runtimeConfig = plugin.applyPlugins({
                key: 'access',
                type: ApplyPluginsType.modify,
                initialValue: {}
            });
            if (runtimeConfig.noAccessHandler && typeof runtimeConfig.noAccessHandler === 'function') {
                runtimeConfig.noAccessHandler({
                    router, to, from, next
                });
            } else {
                next(false);
            }
        }
    });
}

export function onAppCreated({ app }) {
    install(app);
}
