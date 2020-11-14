import { join } from 'path';
import { existsSync } from 'fs';
import { winPath } from '@umijs/utils';

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
        const prefix = existsSync(join(cwd, 'src')) ? join(cwd, 'src') : cwd;
        // 添加 .vue 后缀
        webpackConfig.resolve.extensions.merge([
            '.vue'
        ]);
        webpackConfig.module
            .rule('js-in-node_modules').use('babel-loader').tap((options) => {
                console.log(options);
                options.cacheDirectory = winPath(`${prefix}/.fes/.cache/babel-loader`);
                return options;
            });

        return webpackConfig;
    });
};
