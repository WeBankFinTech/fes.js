import { getInnerCommonConfig } from '../../common/getConfig';
import babelPolyfillPlugin from './babelPolyfillPlugin';

export default async (api) => {
    const { deepmerge, getTargetsAndBrowsersList } = api.utils;

    const { build = {} } = api.config.viteOption;
    const { targets, browserslist } = getTargetsAndBrowsersList({ config: api.config });

    const bundleConfig = deepmerge(getInnerCommonConfig(api), {
        mode: 'production',
        css: {
            postcss: {
                plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-safe-parser'),
                    require('autoprefixer')({
                        ...api.config.autoprefixer,
                        overrideBrowserslist: browserslist,
                    }),
                ],
            },
        },
        plugins: [
            babelPolyfillPlugin({
                targets,
            }),
        ],
        build: {
            ...build,
            terserOptions: build.terserOptions || api.config.terserOptions,
            target: build.target || 'es2015',
            outDir: build.outDir || api.config.outputPath || 'dist',
            assetsInlineLimit: build.assetsInlineLimit || api.config.inlineLimit || 8192,
        },
    });

    return api.applyPlugins({
        type: api.ApplyPluginsType.modify,
        key: 'modifyBundleConfig',
        initialValue: bundleConfig,
        args: {},
    });
};
