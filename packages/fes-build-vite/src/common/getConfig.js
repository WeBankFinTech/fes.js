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
                createHtmlPlugin({
                    minify: true,
                    entry: join(api.paths.absTmpPath, 'fes.js'),
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
        },
        otherViteOption,
    );
}
