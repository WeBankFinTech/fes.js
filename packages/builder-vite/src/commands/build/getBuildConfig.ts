import type { IPluginAPI } from '@fesjs/shared';
import type { InlineConfig, UserConfig } from 'vite';
import type { ViteBuildConfig } from '../../shared';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssSafeParser from 'postcss-safe-parser';
import { getInnerCommonConfig } from '../../common/getConfig';

function getEsbuildTarget(targets: any): string[] {
    const result: string[] = [];
    ['chrome', 'edge', 'firefox', 'hermes', 'ios', 'node', 'opera', 'rhino', 'safari'].forEach((key) => {
        if (targets[key]) {
            result.push(`${key}${targets[key]}`);
        }
    });
    return result;
}

export default async (api: IPluginAPI<ViteBuildConfig>): Promise<InlineConfig> => {
    const { deepmerge, getTargetsAndBrowsersList } = api.utils;

    const { build = {} } = api.config.vite || api.config.viteOption as UserConfig;
    const { targets, browserslist } = getTargetsAndBrowsersList({ config: api.config });

    const bundleConfig: InlineConfig = deepmerge(getInnerCommonConfig(api), {
        mode: 'production',
        css: {
            postcss: {
                plugins: [
                    postcssFlexbugsFixes,
                    postcssSafeParser,
                    autoprefixer({
                        ...api.config.autoprefixer,
                        overrideBrowserslist: browserslist,
                    }),
                ],
            },
        },
        plugins: [
            legacy({
                modernPolyfills: true,
                renderLegacyChunks: false,
                targets,
                ...api.config.viteLegacy,
            }),
        ],
        build: {
            ...build,
            terserOptions: build.terserOptions || api.config.terserOptions,
            outDir: build.outDir || api.config.outputPath || 'dist',
            assetsDir: build.assetsDir || 'static',
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
