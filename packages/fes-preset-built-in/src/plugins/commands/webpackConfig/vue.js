// import webpack from 'webpack';

export default function createVueWebpackConfig({
    config,
    webpackConfig
}) {
    webpackConfig.module
        .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
        .loader(require.resolve('vue-loader'))
        .options({
            babelParserPlugins: ['jsx', 'classProperties', 'decorators-legacy'],
            ...(config.vueLoader || {})
        })
        .end();

    webpackConfig
        .plugin('vue-loader')
        .use(require('vue-loader').VueLoaderPlugin);

    // webpackConfig
    //     .plugin('feature-flags')
    //     .use(webpack.DefinePlugin, [{
    //         __VUE_OPTIONS_API__: 'true',
    //         __VUE_PROD_DEVTOOLS__: 'false'
    //     }]);
}
