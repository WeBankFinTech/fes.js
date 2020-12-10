import { readFileSync } from 'fs';
import { join } from 'path';
import { runtimePath } from '../../../../utils/constants';

export default function (api) {
    const {
        utils: { Mustache }
    } = api;

    const absoluteFilePath = 'core/routes.js';

    api.onGenerateFiles(async () => {
        const routesTpl = readFileSync(join(__dirname, 'routes.tpl'), 'utf-8');
        const routes = await api.getRoutesJSON();
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(routesTpl, {
                runtimePath,
                routes,
                config: api.config
            })
        });
    });

    api.addExports(() => [
        {
            specifiers: ['router'],
            source: absoluteFilePath
        }
    ]);
}
