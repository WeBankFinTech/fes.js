import { getRoutes } from '../route';

export default function (api) {
    api.describe({
        key: 'routes'
    });

    api.registerMethod({
        name: 'getRoutes',
        async fn() {
            return api.applyPlugins({
                key: 'modifyRoutes',
                type: api.ApplyPluginsType.modify,
                initialValue: getRoutes({
                    config: api.config,
                    absPagesPath: api.paths.absPagesPath
                })
            });
        }
    });
}
