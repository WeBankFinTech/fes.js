export default (api) => {
    api.describe({
        key: 'viteVueJsx',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
    });
};
