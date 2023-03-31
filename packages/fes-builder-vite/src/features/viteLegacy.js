export default (api) => {
    api.describe({
        key: 'viteLegacy',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
        enableBy: () => !!process.env.ANALYZE,
    });
};
