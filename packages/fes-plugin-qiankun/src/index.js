import { join } from 'path';

const namespace = 'plugin-qiankun';

export default (api) => {
    api.describe({
        key: 'qiankun',
        config: {
            schema(joi) {
                return joi.object().keys({
                    mirco: joi.object(),
                    main: joi.object()
                });
            }
        }
    });

    api.registerPlugins([
        require.resolve('./main'),
        require.resolve('./mirco')
    ]);

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
