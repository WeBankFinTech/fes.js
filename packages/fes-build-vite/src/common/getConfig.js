import { join } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';
import SFCConfigBlockPlugin from './SFCConfigBlockPlugin';
import getDefine from './getDefine';

// TODO
// * 如何处理 html (改 mountId or title 等)（比较麻烦，晚点再看看有无更好的方案）

export function getInnerCommonConfig(api) {
    const { deepmerge } = api.utils;
    const { server, build, define, base, ...otherViteOption } = api.config.viteOption;

    const publicPath = base || api.config.publicPath;

    return deepmerge(
        {
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
                    template: 'public/index.html',
                    inject: {
                        data: {
                            title: 'Fes.js',
                            mountElementId: api.config.mountElementId,
                        },
                    },
                }),
            ],
            resolve: {
                alias: {
                    '@': api.paths.absSrcPath,
                    '@@': api.paths.absTmpPath,
                    [api.builder.innerDepPrefix]: '/',
                },
            },
        },
        otherViteOption,
    );
}
