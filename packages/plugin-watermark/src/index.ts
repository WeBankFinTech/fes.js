import type { IPluginAPI } from '@fesjs/shared';
import { join } from 'node:path';
import pkg from '../package.json' assert { type: 'json' };
import { OWNER_DIR } from './shared';

const namespace = 'plugin-watermark';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'watermark',
        config: {
            schema(joi) {
                return joi.object({
                    disabled: joi.boolean(),
                });
            },
            default: {},
        },
    });

    const absoluteFilePath = join(namespace, 'core.js');

    // 当配置为disabled时不显示水印
    api.modifyConfig((memo) => {
        const defineConfig = memo.define;
        defineConfig.WATERMARK_DISABLED = memo.watermark.disabled ?? false;
        return {
            ...memo,
            define: defineConfig,
        };
    });

    api.onGenerateFiles(() => {
        api.copyTmpFiles({
            namespace,
            path: join(OWNER_DIR, 'dist/runtime'),
            ignore: ['.tpl'],
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['createWatermark', 'destroyWatermark'],
            source: absoluteFilePath,
        },
    ]);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
