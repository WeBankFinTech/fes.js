import { readFileSync } from 'fs';
import { join } from 'path';
import { winPath } from '@umijs/utils';
import { parseStore } from './helper';

const namespace = 'plugin-vuex';

export default (api) => {
    const {
        paths,
        utils: { Mustache }
    } = api;

    api.describe({
        key: 'vuex',
        config: {
            schema(joi) {
                return joi.object();
            },
            onChange: api.ConfigChangeType.regenerateTmpFiles
        }
    });

    const absCoreFilePath = join(namespace, 'core.js');
    const absRuntimeFilePath = join(namespace, 'runtime.js');
    api.onGenerateFiles(() => {
        const root = winPath(join(paths.absSrcPath, api.config.singular ? 'store' : 'stores'));
        const store = parseStore(root);
        const vuexConfig = api.config.vuex || {};
        // 文件写出
        api.writeTmpFile({
            path: absCoreFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'),
                {
                    IMPORT_MODULES: store.importModules.join('\n'),
                    IMPORT_PLUGINS: store.importPlugins.join('\n'),
                    MODULES: `{ ${store.modules.join(', ')} }`,
                    PLUGINS: `[${store.plugins.join(', ')}]`,
                    MUTATION_TYPES: JSON.stringify(store.MUTATION_TYPES),
                    ACTION_TYPES: JSON.stringify(store.ACTION_TYPES),
                    GETTER_TYPES: JSON.stringify(store.GETTER_TYPES),
                    VUEX_CONFIG: JSON.stringify(vuexConfig)
                }
            )
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl']
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['MUTATION_TYPES', 'ACTION_TYPES', 'GETTER_TYPES', 'store'],
            source: absCoreFilePath
        }
    ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
