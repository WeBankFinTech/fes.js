// eslint-disable-next-line import/extensions
import { access as accessApi } from '../plugin-access/core';
import Exception404 from './views/404';
import Exception403 from './views/403';
import getRuntimeConfig from './helpers/getRuntimeConfig';

if (!accessApi) {
    throw new Error(
        '[plugin-layout]: pLugin-layout depends on plugin-access，please install plugin-access first！'
    );
}

const handle = (type, router) => {
    const accesssIds = accessApi.getAccess();
    const path = `/${type}`;
    const name = `Exception${type}`;
    const components = {
        404: Exception404,
        403: Exception403
    };
    if (!accesssIds.includes(path)) {
        accessApi.setAccess(accesssIds.concat([path]));
    }
    if (!router.hasRoute(name)) {
        router.addRoute({ path, name, component: components[type] });
    }
};

export const access = memo => ({
    unAccessHandler({
        router, to, from, next
    }) {
        const runtimeConfig = getRuntimeConfig();
        if (runtimeConfig.unAccessHandler && typeof runtimeConfig.unAccessHandler === 'function') {
            return runtimeConfig.unAccessHandler({
                router, to, from, next
            });
        }
        if (to.path === '/404') {
            handle(404, router);
            return next('/404');
        }
        handle(403, router);
        next('/403');
    },
    noFoundHandler({
        router, to, from, next
    }) {
        const runtimeConfig = getRuntimeConfig();
        if (runtimeConfig.noFoundHandler && typeof runtimeConfig.noFoundHandler === 'function') {
            return runtimeConfig.noFoundHandler({
                router, to, from, next
            });
        }
        if (to.path === '/403') {
            handle(403, router);
            return next('/403');
        }
        handle(404, router);
        next('/404');
    },
    ...memo
});
