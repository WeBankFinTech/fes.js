
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';

export default (api) => {
    api.describe({
        key: 'windi',
        config: {
            default: {}
        }
    });

    api.addEntryImportsAhead(() => [{ source: 'windi.css' }]);

    api.chainWebpack((memo) => {
        memo.plugin('windicss').before('vue-loader-plugin').use(WindiCSSWebpackPlugin);
        return memo;
    });
};
