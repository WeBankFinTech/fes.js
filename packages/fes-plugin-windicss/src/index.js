import WindiCSS from 'vite-plugin-windicss';
import { name } from '../package.json';

function getWindicssConfig(api) {
    const { config, ...otherOption } = api.config.windicss;
    return {
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
    };
}

function buildWindicssWithWebpack(api) {
    api.chainWebpack((memo, { createCSSRule }) => {
        memo.plugin('windicss').use(require('windicss-webpack-plugin'), [getWindicssConfig(api)]);
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
}

function buildWindicssWithVite(api) {
    api.modifyBundleConfig((memo) => {
        memo.plugins.push(WindiCSS(getWindicssConfig(api).config));

        return memo;
    });
}

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

    if (api.builder.name === 'vite') {
        buildWindicssWithVite(api);
    } else {
        buildWindicssWithWebpack(api);
    }

    api.addConfigType(() => ({
        source: name,
    }));
};
