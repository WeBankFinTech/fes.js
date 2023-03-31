export default (api) => {
    api.describe({
        key: 'viteHtml',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
        enableBy: () => !!process.env.ANALYZE,
    });
};
