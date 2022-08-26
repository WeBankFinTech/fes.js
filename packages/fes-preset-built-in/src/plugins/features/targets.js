export default (api) => {
    api.describe({
        key: 'targets',
        config: {
            default: {
                android: '61.0.0',
                chrome: '61.0.0',
                edge: '16.0.0',
                firefox: '60.0.0',
                ios: '10.3.0',
                node: '13.2.0',
                opera: '48.0.0',
                safari: '10.1.0',
                samsung: '8.2.0',
                browsers: ['defaults and not chrome < 61'],
            },
            schema(joi) {
                return joi.object();
            },
        },
    });
};
