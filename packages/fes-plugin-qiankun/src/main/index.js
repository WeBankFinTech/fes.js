import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import {
    defaultMainRootId,
    defaultHistoryType,
    qiankunStateForMicroModelNamespace
} from '../constants';
import modifyRoutes from './modifyRoutes';

const namespace = 'plugin-qiankun/main';

export function isMasterEnable(api) {
    return (
        !!api.userConfig?.qiankun?.main
        || !!process.env.INITIAL_QIANKUN_MAIN_OPTIONS
    );
}

export default function (api) {
    const {
        utils: { Mustache, winPath }
    } = api;

    api.describe({
        enableBy: () => isMasterEnable(api)
    });

    api.modifyDefaultConfig(config => ({
        ...config,
        mountElementId: defaultMainRootId
    }));

    modifyRoutes({ api, namespace });

    const absMicroAppPath = join(namespace, 'MicroApp.js');
    const absRuntimePath = join(namespace, 'runtime.js');
    const absMasterOptionsPath = join(namespace, 'masterOptions.js');
    const absGetMicroAppRouteCompPath = join(
        namespace,
        'getMicroAppRouteComponent.js'
    );

    api.onGenerateFiles(() => {
        const HAS_PLUGIN_MODEL = api.hasPlugins(['@fesjs/plugin-model']);
        api.writeTmpFile({
            path: absMicroAppPath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'runtime/MicroApp.tpl'), 'utf-8'),
                {
                    qiankunStateForMicroModelNamespace,
                    HAS_PLUGIN_MODEL:
                        HAS_PLUGIN_MODEL
                        && existsSync(
                            winPath(
                                join(
                                    api.paths.absSrcPath,
                                    'models/qiankunStateForMicro.js'
                                )
                            )
                        )
                }
            )
        });

        api.writeTmpFile({
            path: absRuntimePath,
            content: readFileSync(
                join(__dirname, 'runtime/runtime.tpl'),
                'utf-8'
            )
        });

        api.writeTmpFile({
            path: absGetMicroAppRouteCompPath,
            content: readFileSync(
                join(__dirname, 'runtime/getMicroAppRouteComponent.tpl'),
                'utf-8'
            )
        });

        const { main: options } = api.config?.qiankun || {};
        const masterHistoryType = api.config?.router?.mode || defaultHistoryType;
        const base = api.config.base || '/';
        api.writeTmpFile({
            path: absMasterOptionsPath,
            content: `
            let options = ${JSON.stringify({
        masterHistoryType,
        base,
        ...options
    })};
            export const getMasterOptions = () => options;
            export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
            `
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['MicroApp'],
            source: absMicroAppPath
        }
    ]);

    api.addPluginExports(() => [
        {
            specifiers: ['getMicroAppRouteComponent'],
            source: absGetMicroAppRouteCompPath
        }
    ]);
}
