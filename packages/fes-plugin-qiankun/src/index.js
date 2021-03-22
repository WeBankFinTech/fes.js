// import { join } from 'path';

// const namespace = 'plugin-qiankun';

export default (api) => {
    api.describe({
        key: 'qiankun',
        config: {
            schema(joi) {
                return joi.object().keys({
                    micro: joi.object(),
                    main: joi.object()
                });
            }
        }
    });

    api.addRuntimePluginKey(() => 'qiankun');

    api.registerPlugins([
        require.resolve('./main'),
        require.resolve('./micro')
    ]);

    // const absRuntimeFilePath = join(namespace, 'runtime.js');

    // api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
