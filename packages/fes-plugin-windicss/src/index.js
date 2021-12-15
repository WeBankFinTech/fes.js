
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';
import { resolve } from 'path';
import qs from 'qs';

export default (api) => {
    api.describe({
        key: 'windicss',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {}
        }
    });

    api.addEntryImportsAhead(() => [{ source: 'windi.css' }]);

    api.chainWebpack((memo) => {
        memo.plugin('windicss').use(WindiCSSWebpackPlugin, [
            {
                config: resolve(__dirname, '../windi.config.js'),
                ...api.config.windicss
            }
        ]);
        memo.module
            .rule('vue-custom')
            .resourceQuery((query) => {
                if (!query) {
                    return false;
                }
                const parsed = qs.parse(query.slice(1));
                return parsed.vue != null;
            }).use('vue-custom-loader').loader(require.resolve('./pitcher'));
        return memo;
    });
};
