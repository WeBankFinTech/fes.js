import { join } from 'path';
import { existsSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';
import SFCConfigBlockPlugin from './SFCConfigBlockPlugin';
import getDefine from './getDefine';

function getPostcssConfig(api) {
    // TODO 支持其他 postcss 配置文件类型
    const configPath = `${api.paths.cwd}/postcss.config.js`;
    if (existsSync(configPath)) {
        return require(`${api.paths.cwd}/postcss.config.js`);
    }
    return {};
}

export function getInnerCommonConfig(api) {
    const { deepmerge, resolveRuntimeEnv } = api.utils;
    const { server, build, define, base, ...otherViteOption } = api.config.viteOption;

    const publicPath = base || api.config.publicPath || '/';

    return deepmerge(
        {
            base: publicPath,
            configFile: false,
            define: getDefine(api, publicPath),
            cacheDir: join(api.cwd, '.cache'),
            css: {
                postcss: {
                    ...getPostcssConfig(api),
                },
            },
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
