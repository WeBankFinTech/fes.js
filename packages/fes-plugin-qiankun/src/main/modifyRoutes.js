import { join } from 'path';
import { readFileSync } from 'fs';
import { defaultHistoryType } from '../constants';

let index = 0;

function modifyRoutesWithAttachMode({ routes, api, namespace, masterHistoryType, base }) {
    if (!routes.length) return;
    routes.forEach((route) => {
        if (route.meta && route.meta.microApp) {
            const fileName = `MicroAppRouteComponent${index++}.vue`;
            route.component = `@@/${namespace}/${fileName}`;
            api.writeTmpFile({
                path: join(namespace, fileName),
                content: api.utils.Mustache.render(readFileSync(join(__dirname, 'runtime/MicroAppRouteComponent.tpl'), 'utf-8'), {
                    cacheName: route.meta.cacheName ?? route.path,
                    microAppName: route.meta.microApp,
                    masterHistoryType,
                    base,
                    namespace,
                }),
            });
        }
        if (route.children?.length) {
            modifyRoutesWithAttachMode({
                routes: route.children,
                api,
                namespace,
                masterHistoryType,
                base,
            });
        }
    });
}

export default function modifyRoutes({ api, namespace }) {
    api.modifyRoutes((routes) => {
        const { router, base } = api.config;
        const masterHistoryType = (router && router.mode) || defaultHistoryType;

        modifyRoutesWithAttachMode({
            api,
            namespace,
            routes,
            masterHistoryType,
            base: base || '/',
        });

        return routes;
    });
}
