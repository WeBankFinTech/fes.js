export default (api) => {
    api.describe({
        key: 'extraPostCSSPlugins',
        config: {
            schema(joi) {
                return joi.array();
            },
        },
    });
};
