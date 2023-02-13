export default (api) => {
    api.describe({
        key: 'targets',
        config: {
            default: {
                chrome: '64',
                ios: '11',
                browsers: ['defaults and not chrome < 61'],
            },
            schema(joi) {
                return joi.object();
            },
        },
    });
};
