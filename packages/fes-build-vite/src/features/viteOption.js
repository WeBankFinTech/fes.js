export default (api) => {
    api.describe({
        key: 'viteOption',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
    });
};
