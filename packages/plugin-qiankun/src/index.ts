import type { IPluginAPI } from '@fesjs/shared';
import { join } from 'node:path';
import pkg from '../package.json' assert { type: 'json' };
import { OWNER_DIR } from './constants';

export default async (api: IPluginAPI) => {
    api.describe({
        key: 'qiankun',
        config: {
            schema(joi) {
                return joi.object().keys({
                    micro: joi.object(),
                    main: joi.object(),
                });
            },
        },
    });

    api.addRuntimePluginKey(() => 'qiankun');

    await api.registerPlugins([join(OWNER_DIR, './main/index.mjs'), join(OWNER_DIR, './micro/index.mjs')]);

    api.addConfigType(() => ({
        source: pkg.name,
        build: ['QiankunBuildConfig'],
    }));
};
