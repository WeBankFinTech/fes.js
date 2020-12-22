import { readFileSync } from 'fs';
import { join } from 'path';

const namespace = 'plugin-access';

export default (api) => {
    const {
        utils: { Mustache }
    } = api;

    api.describe({
        config: {
            schema(joi) {
                return joi.object({
                    roles: joi.object()
                });
            },
            default: {}
        }
    });

    const absoluteFilePath = join(namespace, 'core.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(() => {
        // 文件写出
        const { roles = {} } = api.config.access || {};

        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'template/core.tpl'), 'utf-8'),
                {
                    REPLACE_ROLES: JSON.stringify(roles)
                }
            )
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: readFileSync(
                join(__dirname, 'template/runtime.tpl'),
                'utf-8'
            )
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['access', 'useAccess'],
            source: absoluteFilePath
        }
    ]);

    api.addRuntimePluginKey(() => 'access');

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
