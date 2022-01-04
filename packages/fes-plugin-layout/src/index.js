import { readFileSync } from 'fs';
import { join } from 'path';
import { winPath } from '@fesjs/utils';

const namespace = 'plugin-layout';

export default (api) => {
    const {
        utils: { Mustache }
    } = api;

    const helper = require('./node/helper');

    api.describe({
        key: 'layout',
        config: {
            schema(joi) {
                return joi.object();
            },
            onChange: api.ConfigChangeType.regenerateTmpFiles
        }
    });

    api.addRuntimePluginKey(() => 'layout');

    const absFilePath = join(namespace, 'index.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(async () => {
        const { name } = api.pkg;

        const HAS_LOCALE = api.hasPlugins(['@fesjs/plugin-locale']);

        // .fes配置
        const userConfig = {
            title: name,
            footer: 'Created by Fes.js',
            ...(api.config.layout || {})
        };

        // 路由信息
        const routes = await api.getRoutes();
        // 把路由的meta合并到menu配置中
        userConfig.menus = helper.fillMenuByRoute(userConfig.menus, routes);

        const icons = helper.getIconsFromMenu(userConfig.menus);

        const iconsString = icons.map(
            iconName => `import { ${iconName} } from '@fesjs/fes-design/icon'`
        );
        api.writeTmpFile({
            path: join(namespace, 'icons.js'),
            content: `
        ${iconsString.join(';\n')}
        export default {
            ${icons.join(',\n')}
        }`
        });

        api.writeTmpFile({
            path: absFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'runtime/index.tpl'), 'utf-8'),
                {
                    REPLACE_USER_CONFIG: JSON.stringify(userConfig),
                    HAS_LOCALE
                }
            )
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl']
        });
    });

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    // 把BaseLayout插入到路由配置中，作为根路由
    api.modifyRoutes(routes => [
        {
            path: '/',
            component: winPath(
                join(api.paths.absTmpPath || '', absFilePath)
            ),
            children: routes
        }
    ]);
};
