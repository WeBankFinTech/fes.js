export default (api) => {
    api.describe({
        key: 'babelPluginImport',
        config: {
            schema(joi) {
                return joi.array();
            }
        }
    });

    api.modifyBabelOpts((babelOpts) => {
        if (api.config.babelPluginImport) {
            api.config.babelPluginImport.forEach((config) => {
                babelOpts.plugins.push(['import', config]);
            });
        }

        return babelOpts;
    });
};
