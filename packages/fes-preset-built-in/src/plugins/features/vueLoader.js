

export default (api) => {
    api.describe({
        key: 'vueLoader',
        config: {
            schema(joi) {
                return joi
                    .object({})
                    .description(
                        'more vue-loader options see https://vue-loader.vuejs.org/',
                    );
            }
        }
    });
    api.chainWebpack((webpackConfig) => {
        // 添加 .vue 后缀
        webpackConfig.module
            .rule('vue')
            .test(/\.vue$/)
            .use('vue-loader')
            .loader(require.resolve('vue-loader'))
            .options({
                babelParserPlugins: ['jsx', 'classProperties', 'decorators-legacy']
            })
            .end()
            .end();

        webpackConfig
            .plugin('vue-loader')
            .use(require('vue-loader').VueLoaderPlugin);

        return webpackConfig;
    });
};
