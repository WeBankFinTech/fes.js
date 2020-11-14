
export default (api) => {
    api.describe({
        key: 'extraBabelPresets',
        config: {
            schema(joi) {
                return joi.array();
            }
        }
    });
    api.modifyBabelPresetOpts(opts => Object.assign({}, opts, {
        typescript: false,
        env: {
            useBuiltIns: 'entry',
            corejs: 3,
            modules: false
        },
        react: false,
        reactRemovePropTypes: false,
        reactRequire: false,
        svgr: false
    }));
};
