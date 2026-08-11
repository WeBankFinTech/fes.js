import type { IPluginAPI } from '@fesjs/shared';
import { readFileSync } from 'node:fs';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from '../package.json' assert { type: 'json' };

const namespace = 'plugin-enums';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    const {
        utils: { Mustache },
    } = api;

    api.describe({
        key: 'enums',
        config: {
            schema(joi) {
                return joi.object();
            },
            onChange: api.ConfigChangeType.regenerateTmpFiles,
        },
    });

    const absoluteFilePath = join(namespace, 'core.js');
    api.onGenerateFiles(() => {
        // 文件写出
        const enums = api.config.enums || {};
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'), {
                REPLACE_ENUMS: JSON.stringify(enums),
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
            specifiers: ['enums'],
            source: absoluteFilePath,
        },
    ]);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
