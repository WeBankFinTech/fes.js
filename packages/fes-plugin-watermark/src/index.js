import { join } from 'path';

const namespace = 'plugin-watermark';

export default (api) => {
    api.describe({
        key: 'watermark',
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
