export default (api) => {
    api.describe({
        key: 'viteVuePlugin',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
    });
};
