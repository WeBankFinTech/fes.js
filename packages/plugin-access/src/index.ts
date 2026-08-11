import type { IPluginAPI } from '@fesjs/shared';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { fileURLToPath } from 'node:url';
import pkg from '../package.json' assert { type: 'json' };

const namespace = 'plugin-access';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    const {
        utils: { Mustache },
    } = api;

    api.describe({
        key: 'access',
        config: {
            schema(joi) {
                return joi.object({
                    roles: joi.object(),
                });
            },
            default: {},
        },
    });

    const absoluteFilePath = join(namespace, 'core.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(() => {
        // 文件写出
        const { roles = {} } = api.config.access || {};

        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'), {
                REPLACE_ROLES: JSON.stringify(roles),
                lodashPath: 'es-toolkit/compat',
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
            specifiers: ['access', 'useAccess'],
            source: absoluteFilePath,
        },
    ]);

    api.addRuntimePluginKey(() => 'access');

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
