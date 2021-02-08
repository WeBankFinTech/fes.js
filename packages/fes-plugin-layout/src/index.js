import { readFileSync } from 'fs';
import { join } from 'path';
import { winPath } from '@umijs/utils';

const namespace = 'plugin-layout';

export default (api) => {
    const {
        utils: { Mustache }
    } = api;

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

    api.onGenerateFiles(() => {
        const { name } = api.pkg;

        const HAS_LOCALE = api.hasPlugins(['@webank/fes-plugin-locale']);

        // .fes配置
        const userConfig = {
            title: name,
            footer: 'Created by Fes.js',
            ...(api.config.layout || {})
        };

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


    // 把BaseLayout插入到路由配置中，作为跟路由
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
