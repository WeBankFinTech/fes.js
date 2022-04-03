import { getInnerCommonConfig } from '../../common/getConfig';

/**
 * polyfill： @vitejs/plugin-legacy
 * 确认 css 最终构建实现 autoprefixer postcss-safe-parser postcss-flexbugs-fixes
 */

export default async (api) => {
    const { deepmerge } = api.utils;

    const { build = {} } = api.config.viteOption;

    return deepmerge(
        {
            mode: 'production',
            css: {
                postcss: {
                    plugins: [require('postcss-flexbugs-fixes'), require('postcss-safe-parser'), [require('autoprefixer'), {}]],
                },
            },
            build: {
                ...build,
                outDir: build.outDir || api.config.outputPath || 'dist',
                assetsInlineLimit: build.assetsInlineLimit || api.config.inlineLimit || 8192,
            },
        },
        getInnerCommonConfig(api),
    );
};
