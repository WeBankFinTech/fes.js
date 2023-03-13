import { readFileSync } from 'fs';
import { join } from 'path';
import { winPath } from '@fesjs/utils';
import { name } from '../package.json';

const namespace = 'plugin-layout';

export default (api) => {
    const {
        utils: { Mustache },
    } = api;

    const helper = require('./node/helper');

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

    api.onGenerateFiles(async () => {
        // .fes配置
        const userConfig = {
            title: api.title,
            footer: null,
            ...(api.config.layout || {}),
        };

        const iconNames = helper.getIconNamesFromMenu(userConfig.menus);

        const iconsString = iconNames.map((iconName) => `import { ${iconName} } from '@fesjs/fes-design/icon'`);
        api.writeTmpFile({
            path: join(namespace, 'icons.js'),
            content: `
        ${iconsString.join(';\n')}
        export default {
            ${iconNames.join(',\n')}
        }`,
        });

        api.writeTmpFile({
            path: absFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/views/index.tpl'), 'utf-8'), {
                REPLACE_USER_CONFIG: JSON.stringify(userConfig),
            }),
        });

        api.writeTmpFile({
            path: absConfigFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/helpers/getConfig.tpl'), 'utf-8'), {
                REPLACE_USER_CONFIG: JSON.stringify(userConfig),
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
            specifiers: ['Page', 'useTabTitle'],
            source: join(namespace, 'index.js'),
        },
    ]);

    // 把BaseLayout插入到路由配置中，作为根路由
    api.modifyRoutes((routes) => [
        {
            path: '/',
            component: winPath(join(api.paths.absTmpPath || '', absFilePath)),
            children: routes,
        },
    ]);

    api.addConfigType(() => ({
        source: name,
    }));
};
