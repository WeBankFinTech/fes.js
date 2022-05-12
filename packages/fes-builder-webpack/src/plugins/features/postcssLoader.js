export default (api) => {
    api.describe({
        key: 'postcssLoader',
        config: {
            schema(joi) {
                return joi.object();
            },
        },
    });
};
