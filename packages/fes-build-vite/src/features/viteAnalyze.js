export default (api) => {
    api.describe({
        key: 'viteAnalyze',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
        enableBy: () => !!process.env.ANALYZE,
    });

    api.modifyBundleConfig((memo) => {
        memo.plugins.push(
            require('rollup-plugin-visualizer').visualizer({
                filename: './.cache/visualizer/stats.html',
                open: true,
                gzipSize: true,
                brotliSize: true,
                ...api.viteAnalyze,
            }),
        );

        return memo;
    });
};
