import { readFileSync } from 'fs';
import { join } from 'path';
import { defaultMircoRootId } from '../common';

export default function (api, options) {
    const { registerRuntimeKeyInIndex = false } = options || {};

    api.addRuntimePlugin(() => require.resolve('./runtime'));

    if (!registerRuntimeKeyInIndex) {
        api.addRuntimePluginKey(() => 'qiankun');
    }

    const lifecyclePath = require.resolve('./lifecycles');
    const { name: pkgName } = require(join(api.cwd, 'package.json'));

    // TODO: fes缺少修改默认配置API
    api.modifyDefaultConfig(memo => (Object.assign(Object.assign({}, memo), {
        disableGlobalVariables: true,
        base: `/${pkgName}`,
        mountElementId: defaultMircoRootId,
        // 默认开启 runtimePublicPath，避免出现 dynamic import 场景子应用资源地址出问题
        runtimePublicPath: true
    })));

    if (api.service.userConfig.runtimePublicPath !== false) {
        // TODO: fes缺少修改 publicPath API
        api.modifyPublicPathStr(() => `window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || "${
            // 开发阶段 publicPath 配置无效，默认为 /
            process.env.NODE_ENV !== 'development'
                ? api.config.publicPath || '/'
                : '/'}"`);
    }

    api.chainWebpack((config) => {
        assert(api.pkg.name, 'You should have name in package.json');
        config.output
            .libraryTarget('umd')
            .library(`${api.pkg.name}-[name]`);
    });

    // bundle 添加 entry 标记
    // TODO: fes缺少修改HTML API
    api.modifyHTML(($) => {
        $('script').each((_, el) => {
            const scriptEl = $(el);
            const umiEntryJs = /\/?umi(\.\w+)?\.js$/g;
            const scriptElSrc = scriptEl.attr('src');

            if (umiEntryJs.test((scriptElSrc) !== null && scriptElSrc !== 0 ? scriptElSrc : '')) {
                scriptEl.attr('entry', '');
            }
        });
        return $;
    });

    const namespace = 'plugin-qiankun';

    api.onGenerateFiles(() => {
        api.writeTmpFile({
            path: `${namespace}/qiankunContext.js`,
            content: `
                import { createApp, h } from 'vue';
                export const Context = createContext(null);
                export function useRootExports() {
                    return useContext(Context);
                };
            `.trim()
        });

        api.writeTmpFile({
            path: `${namespace}/runtime.js`,
            content: readFileSync(join(__dirname, 'runtime.js'), 'utf-8')
        });

        api.writeTmpFile({
            path: `${namespace}/lifecycles.js`,
            content: readFileSync(join(__dirname, 'lifecycles.js'), 'utf-8')
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['useRootExports'],
            source: `${namespace}/qiankunContext.js`
        }
    ]);

    api.addEntryImports(() => ({
        source: lifecyclePath,
        specifier: '{ genMount as qiankun_genMount, genBootstrap as qiankun_genBootstrap, genUnmount as qiankun_genUnmount }'
    }));

    api.addEntryCode(() => `
        export const bootstrap = qiankun_genBootstrap(Promise.resolve(), clientRender);
        export const mount = qiankun_genMount();
        export const unmount = qiankun_genUnmount('${api.config.mountElementId}');

        if (!window.__POWERED_BY_QIANKUN__) {
            bootstrap().then(mount);
        }
    `);
}
