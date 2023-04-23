export default (api) => {
    api.describe({
        key: 'extraCSS',
        config: {
            schema(joi) {
                return joi.object({
                    plugin: joi.object(),
                    loader: joi.object(),
                });
            },
            default: {},
        },
    });
};
