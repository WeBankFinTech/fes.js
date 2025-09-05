import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { fileURLToPath } from 'node:url';
import { defaultHistoryType } from '../constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let index = 0;

function modifyRoutesWithAttachMode({ routes, api, namespace, masterHistoryType, base }) {
    if (!routes.length) {
        return;
    }
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
