// eslint-disable-next-line import/extensions
import { access as accessApi } from '../plugin-access/core';
// eslint-disable-next-line import/extensions
import getConfig from './helpers/getConfig';

if (!accessApi) {
    throw new Error('[plugin-layout]: plugin-layout depends on plugin-access，please install plugin-access first！');
}

export const access = (memo) => {
    const runtimeConfig = getConfig();
    const accessIds = accessApi.getAccess();
    if (!accessIds.includes('/403')) {
        accessApi.setAccess(accessIds.concat('/403'));
    }
    if (!accessIds.includes('/404')) {
        accessApi.setAccess(accessIds.concat('/404'));
    }
    return {
        unAccessHandler({ router, to, from, next }) {
            if (runtimeConfig.unAccessHandler && typeof runtimeConfig.unAccessHandler === 'function') {
                return runtimeConfig.unAccessHandler({
                    router,
                    to,
                    from,
                    next,
                });
            }
            next('/403');
        },
        noFoundHandler({ router, to, from, next }) {
            if (runtimeConfig.noFoundHandler && typeof runtimeConfig.noFoundHandler === 'function') {
                return runtimeConfig.noFoundHandler({
                    router,
                    to,
                    from,
                    next,
                });
            }
            next('/404');
        },
        ...memo,
    };
};
