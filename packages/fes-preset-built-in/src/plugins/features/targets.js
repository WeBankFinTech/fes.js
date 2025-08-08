export default (api) => {
    api.describe({
        key: 'targets',
        config: {
            default: {
                chrome: '107',
                ios: '16',
                firefox: '104',
                edge: '107',
            },
            schema(joi) {
                return joi.object();
            },
        },
    });
};
