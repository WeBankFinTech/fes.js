export default (api) => {
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

    api.registerPlugins([require.resolve('./main'), require.resolve('./micro')]);
};
