export default (api) => {
    const { utils } = api;

    api.describe({
        key: 'sass',
        config: {
            schema(joi) {
                return joi.object({
                    implementation: joi.any(),
                    sassOptions: joi.object(),
                    prependData: joi.alternatives(joi.string(), joi.func()),
                    sourceMap: joi.boolean(),
                    webpackImporter: joi.boolean(),
                });
            },
            default: {},
        },
    });

    if (api.builder.isVite) {
        // vite 不需要处理
    } else {
        api.chainWebpack((memo, { createCSSRule }) => {
            createCSSRule({
                lang: 'sass',
                test: /\.(sass|scss)(\?.*)?$/,
                loader: require.resolve('sass-loader'),
                options: utils.deepmerge(
                    {
                        implementation: require('sass'),
                    },
                    api.config.sass || {},
                ),
            });
            return memo;
        });
    }
};
