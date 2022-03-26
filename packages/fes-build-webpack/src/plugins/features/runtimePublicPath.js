export default (api) => {
    api.describe({
        key: 'runtimePublicPath',
        config: {
            schema(joi) {
                return joi.boolean();
            },
        },
        default: false,
    });
};
