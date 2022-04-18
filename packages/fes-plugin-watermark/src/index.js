import { join } from 'path';

const namespace = 'plugin-watermark';

export default (api) => {
    api.describe({
        key: 'watermark',
        config: {
            schema(joi) {
                return joi.object({
                    disabled: joi.boolean()
                });
            },
            default: {}
        }
    });

    const absoluteFilePath = join(namespace, 'core.js');

    // 当配置为disabled时不显示水印
    api.modifyConfig((memo) => {
        const defineConfig = memo.define;
        defineConfig.WATERMARK_DISABLED = memo.watermark.disabled ?? false;
        return {
            ...memo,
            define: defineConfig
        };
    });


    api.onGenerateFiles(() => {
        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl']
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['createWatermark'],
            source: absoluteFilePath
        }
    ]);
};
