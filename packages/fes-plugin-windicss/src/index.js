
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';
import { resolve } from 'path';


export default (api) => {
    api.describe({
        key: 'windicss',
        config: {
            default: {}
        }
    });

    api.addEntryImportsAhead(() => [{ source: 'windi.css' }]);

    api.chainWebpack((memo) => {
        memo.plugin('windicss').before('vue-loader-plugin').use(WindiCSSWebpackPlugin, [
            {
                config: resolve(__dirname, '../windi.config.js'),
                ...api.config.windicss
            }
        ]);
        return memo;
    });
};
