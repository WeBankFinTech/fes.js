
import { readFileSync } from 'fs';
import {
    join
} from 'path';
import { routesToJSON } from '@webank/fes-core';

export default function (api) {
    const {
        utils: { Mustache }
    } = api;

    api.onGenerateFiles(async () => {
        const routesTpl = readFileSync(join(__dirname, 'routes.tpl'), 'utf-8');
        const routes = await api.getRoutes();
        api.writeTmpFile({
            path: 'core/routes.js',
            content: Mustache.render(routesTpl, {
                routes: routesToJSON({ routes, config: api.config }),
                config: api.config
            })
        });
    });
}
