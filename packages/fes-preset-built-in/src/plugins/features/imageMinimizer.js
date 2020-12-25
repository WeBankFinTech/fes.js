// import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

export default (api) => {
    api.describe({
        key: 'imageMinimizer',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {
                disable: true
            }
        }
    });

    api.chainWebpack((webpackConfig) => {
        if (!api.config.imageMinimizer.disable && api.env === 'production') {
            // TODO 图片压缩
        }

        return webpackConfig;
    });
};
