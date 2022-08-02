import { join } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';
import SFCConfigBlockPlugin from './SFCConfigBlockPlugin';
import getDefine from './getDefine';

export function getInnerCommonConfig(api) {
    const { deepmerge, resolveRuntimeEnv } = api.utils;
    const { server, build, define, base, ...otherViteOption } = api.config.viteOption;

    const publicPath = base || api.config.publicPath || '/';
    const postcssConfig = require(`${api.paths.cwd}/postcss.config.js`);

    return deepmerge(
        {
            base: publicPath,
            configFile: false,
            define: getDefine(api, publicPath),
            cacheDir: join(api.cwd, '.cache'),
            css: {
                postcss: {
                    ...postcssConfig,
                },
            },
            plugins: [
                vue(api.config.viteVuePlugin || {}),
                SFCConfigBlockPlugin,
                vueJsx(api.config.viteVueJsx || {}),
                createHtmlPlugin({
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
                }),
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
