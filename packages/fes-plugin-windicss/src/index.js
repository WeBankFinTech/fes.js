
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';
import { resolve } from 'path';

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
        return memo;
    });
};
