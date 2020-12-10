import { access } from './core';

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
            next(false);
        }
    });
}