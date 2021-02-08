import deepmerge from 'deepmerge';

const defaultTerserOptions = {
    compress: {
    // turn off flags with small gains to speed up minification
        arrows: false,
        collapse_vars: false, // 0.3kb
        comparisons: false,
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        inline: false,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        switches: false,
        toplevel: false,
        typeofs: false,

        // a few flags with noticeable gains/speed ratio
        // numbers based on out of the box vendor bundle
        booleans: true, // 0.7kb
        if_return: true, // 0.4kb
        sequences: true, // 0.7kb
        unused: true, // 2.3kb

        // required features to drop conditional branches
        conditionals: true,
        dead_code: true,
        evaluate: true
    },
    mangle: {
        safari10: true
    }
};

const terserOptions = config => ({
    terserOptions: deepmerge(
        defaultTerserOptions,
        config.terserOptions || {}
    ),
    extractComments: false
});


export default function createMinimizerWebpackConfig({
    isProd,
    config,
    webpackConfig
}) {
    if (isProd) {
        webpackConfig.optimization
            .minimizer('terser')
            .use(require.resolve('terser-webpack-plugin'), [terserOptions(config)]);
    }
    if (process.env.FES_ENV === 'test') {
        webpackConfig.optimization.minimize(false);
    }
}
