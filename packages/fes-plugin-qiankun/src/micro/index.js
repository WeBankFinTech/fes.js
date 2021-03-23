import assert from 'assert';
import address from 'address';
import { lodash } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
// import { defaultMircoRootId } from '../common';

const namespace = 'plugin-qiankun/micro';

export function isSlaveEnable(api) {
    return (
        !!api.userConfig?.qiankun?.micro
      || lodash.isEqual(api.userConfig?.qiankun, {})
      || !!process.env.INITIAL_QIANKUN_MIRCO_OPTIONS
    );
}

export default function (api) {
    api.describe({
        enableBy: () => isSlaveEnable(api)
    });

    api.modifyDefaultConfig(memo => ({
        ...memo,
        runtimePublicPath: true
    }));

    api.modifyPublicPathStr((publicPathStr) => {
        const { runtimePublicPath } = api.config;
        const qiankunConfig = api.config.qiankun || {};
        if (!qiankunConfig || !qiankunConfig.micro) {
            return publicPathStr;
        }
        const { shouldNotModifyRuntimePublicPath } = qiankunConfig;

        if (runtimePublicPath === true && !shouldNotModifyRuntimePublicPath) {
            return `window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || "${
                api.config.publicPath || '/'
            }"`;
        }

        return publicPathStr;
    });

    api.chainWebpack((config) => {
        assert(api.pkg.name, 'You should have name in package.json');
        config.output.libraryTarget('umd').library(`${api.pkg.name}-[name]`);
        return config;
    });

    const port = process.env.PORT;
    // source-map 跨域设置
    if (process.env.NODE_ENV === 'development' && port) {
        const localHostname = process.env.USE_REMOTE_IP
            ? address.ip()
            : process.env.HOST || 'localhost';

        const protocol = process.env.HTTPS ? 'https' : 'http';
        // // 变更 webpack-dev-server websocket 默认监听地址
        // process.env.SOCKET_SERVER = `${protocol}://${localHostname}:${port}/`;
        api.chainWebpack((memo, { webpack }) => {
            // 开启了 devSourceMap 配置，默认为 true
            if (api.config.qiankun && api.config.qiankun.micro && api.config.qiankun.micro.devSourceMap !== false) {
                // 禁用 devtool，启用 SourceMapDevToolPlugin
                memo.devtool(false);
                memo.plugin('source-map').use(webpack.SourceMapDevToolPlugin, [
                    {
                        // @ts-ignore
                        namespace: api.pkg.name,
                        append: `\n//# sourceMappingURL=${protocol}://${localHostname}:${port}/[url]`,
                        filename: '[file].map'
                    }
                ]);
            }
            return memo;
        });
    }

    const absRuntimePath = join(namespace, 'runtime.js');
    const absLifeclesPath = join(namespace, 'lifecycles.js');
    const absMicroOptionsPath = join(namespace, 'slaveOptions.js');

    api.onGenerateFiles(() => {
        api.writeTmpFile({
            path: absRuntimePath,
            content: readFileSync(join(__dirname, 'runtime/runtime.tpl'), 'utf-8')
        });

        api.writeTmpFile({
            path: absLifeclesPath,
            content: readFileSync(join(__dirname, 'runtime/lifecycles.tpl'), 'utf-8')
        });

        api.writeTmpFile({
            path: absMicroOptionsPath,
            content: `
            let options = ${JSON.stringify((api.config.qiankun || {}).micro || {})};
            export const getSlaveOptions = () => options;
            export const setSlaveOptions = (newOpts) => options = ({ ...options, ...newOpts });
            `
        });
    });

    api.addEntryImports(() => ({
        source: `@@/${absLifeclesPath}`,
        specifier:
            '{ genMount as qiankun_genMount, genBootstrap as qiankun_genBootstrap, genUnmount as qiankun_genUnmount, genUpdate as qiankun_genUpdate  }'
    }));

    api.addEntryCode(
        () => `
export const bootstrap = qiankun_genBootstrap(completeClientRender, app);
export const mount = qiankun_genMount('${api.config.mountElementId}');
export const unmount = qiankun_genUnmount('${api.config.mountElementId}');
export const update = qiankun_genUpdate();

if (!window.__POWERED_BY_QIANKUN__) {
    bootstrap().then(mount);
}
`
    );

    // const { registerRuntimeKeyInIndex = false } = options || {};

    // api.addRuntimePlugin(() => require.resolve('./runtime'));

    // // if (!registerRuntimeKeyInIndex) {
    // //     api.addRuntimePluginKey(() => 'qiankun');
    // // }

    // const lifecyclePath = require.resolve('./lifecycles');
    // const { name: pkgName } = require(join(api.cwd, 'package.json'));

    // // TODO: fes缺少修改默认配置API
    // api.modifyDefaultConfig(memo => Object.assign(Object.assign({}, memo), {
    //     disableGlobalVariables: true,
    //     base: `/${pkgName}`,
    //     mountElementId: defaultMircoRootId,
    //     // 默认开启 runtimePublicPath，避免出现 dynamic import 场景子应用资源地址出问题
    //     runtimePublicPath: true
    // }));

    // if (api.service.userConfig.runtimePublicPath !== false) {
    //     // TODO: fes缺少修改 publicPath API
    //     api.modifyPublicPathStr(
    //         () => `window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || "${
    //             // 开发阶段 publicPath 配置无效，默认为 /
    //             process.env.NODE_ENV !== 'development'
    //                 ? api.config.publicPath || '/'
    //                 : '/'
    //         }"`
    //     );
    // }

    // api.chainWebpack((config) => {
    //     assert(api.pkg.name, 'You should have name in package.json');
    //     config.output.libraryTarget('umd').library(`${api.pkg.name}-[name]`);
    // });

    // // bundle 添加 entry 标记
    // // TODO: fes缺少修改HTML API
    // api.modifyHTML(($) => {
    //     $('script').each((_, el) => {
    //         const scriptEl = $(el);
    //         const umiEntryJs = /\/?umi(\.\w+)?\.js$/g;
    //         const scriptElSrc = scriptEl.attr('src');

    //         if (
    //             umiEntryJs.test(
    //                 scriptElSrc !== null && scriptElSrc !== 0 ? scriptElSrc : ''
    //             )
    //         ) {
    //             scriptEl.attr('entry', '');
    //         }
    //     });
    //     return $;
    // });

    // api.onGenerateFiles(() => {
    //     api.writeTmpFile({
    //         path: `${namespace}/qiankunContext.js`,
    //         content: `
    //             import { createApp, h } from 'vue';
    //             export const Context = createContext(null);
    //             export function useRootExports() {
    //                 return useContext(Context);
    //             };
    //         `.trim()
    //     });

    //     api.writeTmpFile({
    //         path: `${namespace}/runtime.js`,
    //         content: readFileSync(join(__dirname, 'runtime.js'), 'utf-8')
    //     });

    //     api.writeTmpFile({
    //         path: `${namespace}/lifecycles.js`,
    //         content: readFileSync(join(__dirname, 'lifecycles.js'), 'utf-8')
    //     });
    // });

    // api.addPluginExports(() => [
    //     {
    //         specifiers: ['useRootExports'],
    //         source: `${namespace}/qiankunContext.js`
    //     }
    // ]);

    // api.addEntryImports(() => ({
    //     source: lifecyclePath,
    //     specifier:
    //         '{ genMount as qiankun_genMount, genBootstrap as qiankun_genBootstrap, genUnmount as qiankun_genUnmount }'
    // }));

    // api.addEntryCode(
    //     () => `
    //     export const bootstrap = qiankun_genBootstrap(Promise.resolve(), clientRender);
    //     export const mount = qiankun_genMount();
    //     export const unmount = qiankun_genUnmount('${api.config.mountElementId}');

    //     if (!window.__POWERED_BY_QIANKUN__) {
    //         bootstrap().then(mount);
    //     }
    // `
    // );
}
