import { readFileSync, copyFileSync, statSync } from 'fs';
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
        // 文件写出
        const userConfig = api.config.layout || {};

        api.writeTmpFile({
            path: absFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'template/index.tpl'), 'utf-8'),
                {
                    REPLACE_USER_CONFIG: JSON.stringify(userConfig),
                    HAS_LOCALE: api.pkg.dependencies?.['@webank/fes-plugin-locale']
                }
            )
        });
    });

    let generatedOnce = false;
    api.onGenerateFiles(() => {
        if (generatedOnce) return;
        generatedOnce = true;
        const cwd = join(__dirname, '.');
        const files = api.utils.glob.sync('**/*', {
            cwd
        });
        const base = join(api.paths.absTmpPath, namespace);
        files.forEach((file) => {
            if (file.indexOf('template') !== -1) return;
            if (file === 'index.js') return;
            const source = join(cwd, file);
            const target = join(base, file);
            if (statSync(source).isDirectory()) {
                api.utils.mkdirp.sync(target);
            } else {
                copyFileSync(source, target);
            }
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
