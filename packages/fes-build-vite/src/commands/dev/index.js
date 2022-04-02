import { createServer } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';
import { join } from 'path';
import SFCConfigBlockPlugin from '../SFCConfigBlockPlugin';

/**
 * TODO
 * 如何处理 html （比较麻烦，晚点再看看有无更好的方案）
 * exportStatic： vite 如何针对不同的路径输出不同的 html
 *
 * 动态更改页面内容
 *
 * 可以支持的能力
 *
 * port
 * host
 * https
 * alias
 * mountElementId
 * outputPath
 * inlineLimit: 如何实现
 * publicPath: 就是 base
 * typescript 的支持，tsx 的支持: vite 默认支持
 * css modules: vite 默认支持
 * 确认 css 最终构建实现 autoprefixer postcss-safe-parser postcss-flexbugs-fixes
 * babel-plugin-import 的支持: 用 vite-plugin-babel-import
 * define and resolveDefine 和 webpack 一致
 * polyfill： @vitejs/plugin-legacy
 *
 * proxy
 *      createRouteMiddleware 能力
 * 确认 mock 能用
 * 可以给 server 添加 middlewares
 *
 *
 * analyze: rollup-plugin-visualizer
 *
 * 其他插件如何对内部配置进行修改
 */

export default (api) => {
    const {
        paths,
        utils: { chalk, rimraf, getPort, changePort, getHostName },
    } = api;

    let server;

    function destroy() {
        server?.close();
    }

    api.registerCommand({
        command: 'dev',
        description: 'start a local http service for development',
        options: [
            {
                name: '--port',
                description: 'http service port, like 8080',
            },
            {
                name: '--https',
                description: 'whether to turn on the https service',
            },
        ],
        async fn({ args = {} }) {
            rimraf.sync(paths.absTmpPath);

            const port = await getPort(args.port || api.config.viteOption?.server?.port);
            changePort(port);

            const hostname = getHostName(api.config.viteOption?.server?.host);

            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            api.startWatch();

            server = await createServer({
                mode: 'development',
                define: {
                    PAGE_TITLE: 'Vite',
                },
                plugins: [
                    vue(),
                    SFCConfigBlockPlugin,
                    vueJsx(),
                    createHtmlPlugin({
                        minify: true,
                        entry: join(api.paths.absTmpPath, 'fes.js'),
                        template: 'public/index.html',
                        inject: {
                            data: {
                                title: 'Vite',
                            },
                        },
                    }),
                ],
                configFile: false,
                cacheDir: join(api.cwd, '.cache'),
                resolve: {
                    alias: {
                        '@': paths.absSrcPath,
                        '@@': paths.absTmpPath,
                        '@fesInner': '/',
                    },
                },
                server: {
                    port,
                    host: hostname,
                    https: process.env.HTTPS || args.https,
                },
            });
            await server.listen();

            server.printUrls();

            return {
                destroy,
            };
        },
    });

    api.registerMethod({
        name: 'restartServer',
        fn() {
            console.log(chalk.gray('Try to restart dev server...'));
            destroy();
            process.send({
                type: 'RESTART',
            });
        },
    });
};
