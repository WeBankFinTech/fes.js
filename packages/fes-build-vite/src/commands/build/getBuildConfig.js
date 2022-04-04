import legacy from '@vitejs/plugin-legacy';
import { getInnerCommonConfig } from '../../common/getConfig';

export default async (api) => {
    const { deepmerge, getTargetsAndBrowsersList } = api.utils;

    const { build = {} } = api.config.viteOption;
    const { browserslist } = getTargetsAndBrowsersList({ config: api.config });

    const bundleConfig = deepmerge(
        {
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
                legacy({
                    targets: browserslist,
                    ...api.config.viteLegacy,
                }),
            ],
            build: {
                ...build,
                target: build.target || 'es2015',
                outDir: build.outDir || api.config.outputPath || 'dist',
                assetsInlineLimit: build.assetsInlineLimit || api.config.inlineLimit || 8192,
            },
        },
        getInnerCommonConfig(api),
    );

    return api.applyPlugins({
        type: api.ApplyPluginsType.modify,
        key: 'modifyBundleConfig',
        initialValue: bundleConfig,
        args: {},
    });
};
