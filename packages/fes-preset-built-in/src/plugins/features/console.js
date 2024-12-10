export default (api) => {
    api.describe({
        key: 'console',
        config: {
            default: {
                version: false,
            },
            schema(joi) {
                return joi.object().description('output info in console, default version');
            },
        },
    });
};
