export default (api) => {
    api.describe({
        key: 'nodeModulesTransform',
        config: {
            default: {
                exclude: [],
            },
            schema(joi) {
                return joi.object({
                    exclude: joi.array().items(joi.string()),
                });
            },
        },
    });
};
