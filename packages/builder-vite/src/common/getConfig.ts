import type { IPluginAPI } from '@fesjs/shared';
import type { InlineConfig } from 'vite';
import { join } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import getDefine from './getDefine';
import SFCConfigBlockPlugin from './SFCConfigBlockPlugin';
import { createHtmlPlugin } from './vite-plugin-html';

export function getInnerCommonConfig(api: IPluginAPI): InlineConfig {
    const { deepmerge, resolveRuntimeEnv } = api.utils;
    const { base, ...otherViteOption } = (api.config.vite || api.config.viteOption);

    const publicPath = base || api.config.publicPath || '/';

    return deepmerge(
        {
            base: publicPath,
            configFile: false,
            define: getDefine(api, publicPath),
            cacheDir: join(api.cwd, '.cache'),
            plugins: [
                vue(api.config.viteVuePlugin || {}),
                SFCConfigBlockPlugin,
                vueJsx(api.config.viteVueJsx || {}),
                createHtmlPlugin(
                    deepmerge(
                        {
                            minify: true,
                            // 使用绝对地址在win下会提示没有权限
                            entry: `/src/${api.paths.tmpDir}/fes.js`,
                            template: 'index.html',
                            inject: {
                                data: {
                                    ...resolveRuntimeEnv(publicPath),
                                    title: api.config.title || 'Fes.js',
                                    mountElementId: api.config.mountElementId,
                                },
                            },
                        },
                        api.config.viteHtml,
                    ),
                ),
            ],
            resolve: {
                alias: {
                    ...api.config.alias,
                    '@': api.paths.absSrcPath,
                    '@@': api.paths.absTmpPath,
                },
            },
            optimizeDeps: {
                exclude: ['@fesjs/fes'],
            },
        },
        otherViteOption,
    );
}
