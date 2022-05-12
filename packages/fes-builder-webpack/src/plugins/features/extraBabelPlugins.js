export default (api) => {
    api.describe({
        key: 'extraBabelPlugins',
        config: {
            schema(joi) {
                return joi.array();
            },
        },
    });
};
