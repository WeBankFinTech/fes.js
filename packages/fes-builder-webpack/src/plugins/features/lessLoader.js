export default (api) => {
    api.describe({
        key: 'lessLoader',
        config: {
            default: {},
            schema(joi) {
                return joi.object();
            },
        },
    });
};
