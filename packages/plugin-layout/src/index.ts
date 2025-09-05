import type { IPluginAPI } from '@fesjs/shared';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { winPath } from '@fesjs/utils';
import pkg from '../package.json' assert { type: 'json' };
import { getIconNamesFromMenu } from './node/helper';

const namespace = 'plugin-layout';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    const {
        utils: { Mustache },
    } = api;

    api.describe({
        key: 'layout',
        config: {
            schema(joi) {
                return joi.object();
            },
            onChange: api.ConfigChangeType.regenerateTmpFiles,
        },
    });

    api.addRuntimePluginKey(() => 'layout');

    const absFilePath = join(namespace, 'views/index.jsx');

    const absConfigFilePath = join(namespace, 'helpers/getConfig.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.register({
        key: 'addExtraLocales',
        fn: () => [
            join(api.paths.absTmpPath, namespace, 'locales'),
        ],
    });

    api.onGenerateFiles(async () => {
        // .fes配置
        const userConfig = {
            title: api.title,
            footer: null,
            ...(api.config.layout || {}),
        };

        const iconNames = getIconNamesFromMenu(userConfig.menus);

        const iconsString = iconNames.map(iconName => `import { ${iconName} } from '@fesjs/fes-design/icon'`);
        api.writeTmpFile({
            path: join(namespace, 'icons.js'),
            content: `
        ${iconsString.join(';\n')}
        export default {
            ${iconNames.join(',\n')}
        }`,
        });

        api.writeTmpFile({
            path: absConfigFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/helpers/getConfig.tpl'), 'utf-8'), {
                REPLACE_USER_CONFIG: JSON.stringify(userConfig),
            }),
        });

        const HAS_PLUGIN_ACCESS = api.hasPlugins(['@fesjs/plugin-access']);

        api.writeTmpFile({
            path: join(namespace, 'helpers/pluginAccess.js'),
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/helpers/pluginAccess.js.tpl'), 'utf-8'), {
                HAS_PLUGIN_ACCESS,
            }),
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/runtime.js.tpl'), 'utf-8'), {
                HAS_PLUGIN_ACCESS,
            }),
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl'],
        });
    });

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    api.addPluginExports(() => [
        {
            specifiers: ['Page', 'useTabTitle', 'useLayout'],
            source: join(namespace, 'index.js'),
        },
    ]);

    // 把 BaseLayout插入到路由配置中，作为根路由
    // 添加 403 和 404 路由
    api.modifyRoutes((routes) => {
        if (!routes.find(item => item.path === '/403')) {
            routes.push({
                path: '/403',
                name: 'Exception403',
                component: winPath(join(api.paths.absTmpPath, join(namespace, 'views/403.vue'))),
                meta: {
                    title: '403',
                },
            });
        }
        if (!routes.find(item => item.path === '/404')) {
            routes.push({
                path: '/404',
                name: 'Exception404',
                component: winPath(join(api.paths.absTmpPath, join(namespace, 'views/404.vue'))),
                meta: {
                    title: '404',
                },
            });
        }
        return [
            {
                path: '/',
                name: 'fesLayout',
                component: winPath(join(api.paths.absTmpPath || '', absFilePath)),
                children: routes,
            },
        ];
    });

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
