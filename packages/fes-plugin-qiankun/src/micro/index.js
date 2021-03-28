import assert from 'assert';
import address from 'address';
import { lodash } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { qiankunStateFromMainModelNamespace } from '../constants';

const namespace = 'plugin-qiankun/micro';

export function isSlaveEnable(api) {
    return (
        !!api.userConfig?.qiankun?.micro
        || lodash.isEqual(api.userConfig?.qiankun, {})
        || !!process.env.INITIAL_QIANKUN_MIRCO_OPTIONS
    );
}

export default function (api) {
    const {
        utils: { Mustache }
    } = api;

    api.describe({
        enableBy: () => isSlaveEnable(api)
    });

    api.modifyDefaultConfig((memo) => {
        const initialMicroOptions = {
            devSourceMap: true,
            ...JSON.parse(process.env.INITIAL_QIANKUN_MIRCO_OPTIONS || '{}'),
            ...(memo.qiankun || {}).micro
        };
        const modifiedDefaultConfig = {
            ...memo,
            runtimePublicPath: true,
            qiankun: {
                ...memo.qiankun,
                slave: initialMicroOptions
            }
        };

        const shouldNotModifyDefaultBase = api.userConfig.qiankun?.slave?.shouldNotModifyDefaultBase
            ?? initialMicroOptions.shouldNotModifyDefaultBase;
        if (!shouldNotModifyDefaultBase) {
            modifiedDefaultConfig.base = `/${api.pkg.name}`;
        }

        return modifiedDefaultConfig;
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
        // TODO: 变更 webpack-dev-server websocket 默认监听地址
        api.chainWebpack((memo, { webpack }) => {
            // 开启了 devSourceMap 配置，默认为 true
            if (
                api.config.qiankun
                && api.config.qiankun.micro
                && api.config.qiankun.micro.devSourceMap !== false
            ) {
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
    const absPublicPath = join(namespace, 'publicPath.js');
    const absModelPath = join(namespace, 'qiankunModel.js');

    // 更改public path
    api.addEntryImportsAhead(() => [{ source: `@@/${absPublicPath}` }]);

    api.register({
        key: 'addExtraModels',
        fn: () => {
            const HAS_PLUGIN_MODEL = api.hasPlugins(['@fesjs/plugin-model']);
            return HAS_PLUGIN_MODEL ? [{
                absPath: `@@/${absModelPath}`,
                namespace: qiankunStateFromMainModelNamespace
            }] : [];
        }
    });

    api.onGenerateFiles(() => {
        const HAS_PLUGIN_MODEL = api.hasPlugins(['@fesjs/plugin-model']);

        api.writeTmpFile({
            path: absRuntimePath,
            content: readFileSync(
                join(__dirname, 'runtime/runtime.tpl'),
                'utf-8'
            )
        });

        api.writeTmpFile({
            path: absLifeclesPath,
            content: Mustache.render(readFileSync(
                join(__dirname, 'runtime/lifecycles.tpl'),
                'utf-8'
            ), {
                HAS_PLUGIN_MODEL
            })
        });

        api.writeTmpFile({
            path: absPublicPath,
            content: `
            if (window.__POWERED_BY_QIANKUN__) {
                __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
                window.public_path = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
            }
            `
        });

        api.writeTmpFile({
            path: absMicroOptionsPath,
            content: `
            let options = ${JSON.stringify(
        (api.config.qiankun || {}).micro || {}
    )};
            export const getSlaveOptions = () => options;
            export const setSlaveOptions = (newOpts) => options = ({ ...options, ...newOpts });
            `
        });

        if (HAS_PLUGIN_MODEL) {
            api.writeTmpFile({
                path: absModelPath,
                content: readFileSync(join(__dirname, 'runtime/qiankunModel.tpl'), 'utf-8')
            });
        }
    });

    api.addEntryImports(() => ({
        source: `@@/${absLifeclesPath}`,
        specifier:
            '{ genMount as qiankun_genMount, genBootstrap as qiankun_genBootstrap, genUnmount as qiankun_genUnmount, genUpdate as qiankun_genUpdate  }'
    }));

    api.addEntryCode(
        () => `
export const bootstrap = qiankun_genBootstrap(completeClientRender, app);
export const mount = qiankun_genMount('#${api.config.mountElementId}');
export const unmount = qiankun_genUnmount();
export const update = qiankun_genUpdate();

if (!window.__POWERED_BY_QIANKUN__) {
    bootstrap().then(mount);
}
`
    );
}
