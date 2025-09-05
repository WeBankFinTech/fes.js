import type { IPluginAPI } from '@fesjs/shared';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { fileURLToPath } from 'node:url';
import pkg from '../package.json' assert { type: 'json' };
import { parseStore } from './helper';

const namespace = 'plugin-pinia';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    const {
        paths,
        utils: { Mustache, winPath },
    } = api;

    api.describe({
        key: 'pinia',
        config: {
            schema(joi) {
                return joi.object();
            },
            onChange: api.ConfigChangeType.regenerateTmpFiles,
        },
    });

    const absCoreFilePath = join(namespace, 'core.js');
    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(() => {
        const root = winPath(join(paths.absSrcPath, api.config.singular ? 'store' : 'stores'));
        const store = parseStore(root);

        // 文件写出
        api.writeTmpFile({
            path: absCoreFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'), {
                IMPORT_PLUGINS: store.importPlugins.join('\n'),
                PLUGINS: store.plugins,
            }),
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl'],
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['pinia'],
            source: absCoreFilePath,
        },
    ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
