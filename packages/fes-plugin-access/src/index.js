import { readFileSync } from 'fs';
import { join } from 'path';
import { resolveInnerDep } from '@fesjs/utils';
import { name } from '../package.json';

const namespace = 'plugin-access';

export default (api) => {
    const {
        utils: { Mustache },
    } = api;

    api.describe({
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
                lodashPath: resolveInnerDep('lodash-es', api.builder),
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
        source: name,
        runtime: ['AccessRuntimeConfig'],
        build: ['AccessBuildConfig'],
    }));
};
