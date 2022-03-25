import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';

export default (api) => {
    api.describe({
        key: 'windicss',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
    });

    api.addEntryImportsAhead(() => [{ source: 'windi-base.css' }, { source: 'windi-components.css' }, { source: 'windi-utilities.css' }]);

    api.chainWebpack((memo, { createCSSRule }) => {
        const { config, ...otherOption } = api.config.windicss;
        memo.plugin('windicss').use(WindiCSSWebpackPlugin, [
            {
                config: {
                    extract: {
                        // A common use case is scanning files from the root directory
                        include: ['**/*.{vue,jsx,js,ts,tsx}'],
                        // if you are excluding files, make sure you always include node_modules and .git
                        exclude: ['node_modules', '.git', 'dist', '.fes'],
                    },
                    ...config,
                },
                ...otherOption,
            },
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
                    insert: 'body',
                },
            });
        }

        return memo;
    });
};
