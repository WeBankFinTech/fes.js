export default (api) => {
    api.describe({
        key: 'targets',
        config: {
            default: {
                chrome: '64',
                ios: '11',
            },
            schema(joi) {
                return joi.object();
            },
        },
    });
};
