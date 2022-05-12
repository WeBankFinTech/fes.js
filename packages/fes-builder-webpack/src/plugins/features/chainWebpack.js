export default (api) => {
    api.describe({
        key: 'chainWebpack',
        config: {
            schema(joi) {
                return joi.function();
            },
        },
    });
};
