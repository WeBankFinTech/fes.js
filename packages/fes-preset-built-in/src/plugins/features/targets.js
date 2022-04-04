export default (api) => {
    api.describe({
        key: 'targets',
        config: {
            default: {
                chrome: 56,
                firefox: 67,
                safari: 10.4,
                edge: 13,
            },
            schema(joi) {
                return joi.object();
            },
        },
    });
};
