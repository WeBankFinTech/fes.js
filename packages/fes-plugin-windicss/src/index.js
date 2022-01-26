
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

    api.addEntryImportsAhead(() => [{ source: 'windi-base.css' }, { source: 'windi-components.css' }, { source: 'windi-utilities.css' }]);

    api.chainWebpack((memo, { createCSSRule }) => {
        memo.plugin('windicss').use(WindiCSSWebpackPlugin, [
            {
                config: resolve(__dirname, '../windi.config.js'),
                ...api.config.windicss
            }
        ]);
        if (api.env === 'development') {
            memo.module.rule('css').test((path) => {
                if (path.endsWith('windi-utilities.css')) {
                    return false;
                }
                return /\.css$/.test(path);
            });
            createCSSRule({
                lang: 'windicss',
                test: /windi-utilities.css$/,
                styleLoaderOption: {
                    insert: 'body'
                }
            });
        }

        return memo;
    });
};
