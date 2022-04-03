export default (api) => {
    api.describe({
        key: 'viteAnalyze',
        config: {
            schema(joi) {
                return joi.object({}).unknown(true);
            },
            default: {},
        },
        enableBy: () => !!process.env.ANALYZE,
    });
};
