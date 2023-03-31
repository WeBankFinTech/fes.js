import assert from 'assert';
import { readFileSync } from 'fs';
import { join } from 'path';
import { lodash } from '@fesjs/utils';
import vitePluginQiankun from 'vite-plugin-qiankun';
import { qiankunStateFromMainModelNamespace } from '../constants';

const namespace = 'plugin-qiankun/micro';

export function isSlaveEnable(api) {
    return !!api.userConfig?.qiankun?.micro || lodash.isEqual(api.userConfig?.qiankun, {}) || !!process.env.INITIAL_QIANKUN_MIRCO_OPTIONS;
}

export default function (api) {
    const {
        utils: { Mustache },
    } = api;

    api.describe({
        enableBy: () => isSlaveEnable(api),
    });

    api.modifyDefaultConfig((memo) => {
        const initialMicroOptions = {
            devSourceMap: true,
            ...JSON.parse(process.env.INITIAL_QIANKUN_MICRO_OPTIONS || '{}'),
            ...(memo.qiankun || {}).micro,
        };
        const modifiedDefaultConfig = {
            ...memo,
            qiankun: {
                ...memo.qiankun,
                micro: initialMicroOptions,
            },
        };

        const shouldNotModifyDefaultBase = api.userConfig.qiankun?.micro?.shouldNotModifyDefaultBase ?? initialMicroOptions.shouldNotModifyDefaultBase;
        if (!shouldNotModifyDefaultBase) {
            modifiedDefaultConfig.router.base = `/${api.pkg.name}`;
        }

        return modifiedDefaultConfig;
    });

    const absRuntimePath = join(namespace, 'runtime.js');
    const absLifecyclePath = join(namespace, 'lifecycle.js');
    const absMicroOptionsPath = join(namespace, 'slaveOptions.js');
    const absModelPath = join(namespace, 'qiankunModel.js');

    api.register({
        key: 'addExtraModels',
        fn: () => {
            if (api.hasPlugins(['@fesjs/plugin-model'])) {
                return [
                    {
                        absPath: `@@/${absModelPath}`,
                        namespace: qiankunStateFromMainModelNamespace,
                    },
                ];
            }
            return [];
        },
    });

    api.onGenerateFiles(() => {
        const HAS_PLUGIN_MODEL = api.hasPlugins(['@fesjs/plugin-model']);

        api.writeTmpFile({
            path: absRuntimePath,
            content: readFileSync(join(__dirname, 'runtime/runtime.tpl'), 'utf-8'),
        });

        api.writeTmpFile({
            path: absLifecyclePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/lifecycle.tpl'), 'utf-8'), {
                HAS_PLUGIN_MODEL,
            }),
        });

        api.writeTmpFile({
            path: absMicroOptionsPath,
            content: `
            let options = ${JSON.stringify((api.config.qiankun || {}).micro || {})};
            export const getSlaveOptions = () => options;
            export const setSlaveOptions = (newOpts) => options = ({ ...options, ...newOpts });
            `,
        });

        if (HAS_PLUGIN_MODEL) {
            api.writeTmpFile({
                path: absModelPath,
                content: readFileSync(join(__dirname, 'runtime/qiankunModel.tpl'), 'utf-8'),
            });
        }
    });

    api.addRuntimePlugin(() => `@@/${absRuntimePath}`);

    if (api.builder.name === 'vite') {
        // 处理
        api.modifyBundleConfig((memo) => {
            assert(api.pkg.name, 'You should have name in package.json');
            memo.plugins.push(
                vitePluginQiankun(api.pkg.name, {
                    useDevMode: api.config.qiankun?.micro?.useDevMode,
                }),
            );
            return memo;
        });

        api.addEntryImports(() => ({
            source: `vite-plugin-qiankun/dist/helper`,
            specifier: '{ renderWithQiankun, qiankunWindow }',
        }));

        api.addEntryImports(() => ({
            source: `@@/${absLifecyclePath}`,
            specifier:
                '{ genBootstrap as qiankun_genBootstrap, genMount as qiankun_genMount, genUnmount as qiankun_genUnmount, genUpdate as qiankun_genUpdate  }',
        }));

        api.addEntryCode(
            () => `
    const bootstrap = qiankun_genBootstrap(clientRender, app);
    const mount = qiankun_genMount('#${api.config.mountElementId}');
    const unmount = qiankun_genUnmount();
    const update = qiankun_genUpdate();

    renderWithQiankun({
        bootstrap,
        mount,
        update,
        unmount,
    })
    
    if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
        bootstrap().then(mount);
    }
    `,
        );
    } else {
        const absPublicPath = join(namespace, 'publicPath.js');

        // 更改public path
        api.addEntryImportsAhead(() => [{ source: `@@/${absPublicPath}` }]);

        api.onGenerateFiles(() => {
            api.writeTmpFile({
                path: absPublicPath,
                content: `
                if (window.__POWERED_BY_QIANKUN__) {
                    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
                    window.public_path = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
                }
                `,
            });
        });

        api.chainWebpack((config) => {
            assert(api.pkg.name, 'You should have name in package.json');
            config.output.libraryTarget('umd').library(`${api.pkg.name}-[name]`);
            return config;
        });

        api.addEntryImports(() => ({
            source: `@@/${absLifecyclePath}`,
            specifier:
                '{ genBootstrap as qiankun_genBootstrap, genMount as qiankun_genMount, genUnmount as qiankun_genUnmount, genUpdate as qiankun_genUpdate  }',
        }));

        api.addEntryCode(
            () => `
    export const bootstrap = qiankun_genBootstrap(clientRender, app);
    export const mount = qiankun_genMount('#${api.config.mountElementId}');
    export const unmount = qiankun_genUnmount();
    export const update = qiankun_genUpdate();
    
    if (!window.__POWERED_BY_QIANKUN__) {
        bootstrap().then(mount);
    }
    `,
        );
    }
}
