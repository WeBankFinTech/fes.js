import {
    winPath
} from '@umijs/utils';

export default (api) => {
    api.describe({
        key: 'chainWebpack',
        config: {
            schema(joi) {
                return joi.function();
            }
        }
    });

    api.chainWebpack((webpackConfig) => {
        const cwd = api.cwd;
        // 添加 .vue 后缀
        webpackConfig.resolve.extensions.merge([
            '.vue'
        ]);
        webpackConfig.module
            .rule('js-in-node_modules').use('babel-loader').tap((options) => {
                options.cacheDirectory = winPath(`${cwd}/.cache/babel-loader`);
                return options;
            });
        if (api.env !== 'development') {
            webpackConfig
                .optimization.splitChunks({
                    cacheGroups: {
                        vendors: {
                            name: 'chunk-vendors',
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            chunks: 'initial'
                        },
                        common: {
                            name: 'chunk-common',
                            minChunks: 2,
                            priority: -20,
                            chunks: 'initial',
                            reuseExistingChunk: true
                        }
                    }
                });
        }

        return webpackConfig;
    });
};
