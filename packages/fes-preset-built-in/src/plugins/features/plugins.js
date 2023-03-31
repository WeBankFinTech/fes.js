export default (api) => {
    api.describe({
        key: 'plugins',
        config: {
            schema(joi) {
                return joi.array().items(joi.string());
            },
        },
    });
};
