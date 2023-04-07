import { readFileSync } from 'fs';
import { join } from 'path';
import { winPath } from '@fesjs/utils';
import { runtimePath } from '../../../utils/constants';

export default function (api) {
    const {
        paths,
        utils: { Mustache, getAppPath },
    } = api;

    const absoluteFilePath = 'core/plugin.js';

    api.onGenerateFiles(async () => {
        const validKeys = await api.applyPlugins({
            key: 'addRuntimePluginKey',
            type: api.ApplyPluginsType.add,
            initialValue: [
                // modify渲染工具
                'modifyClientRenderOpts',
                'rootContainer',
                // app生成时触发
                'onAppCreated',
                // 渲染
                'render',
                // 修改路由
                'patchRoutes',
                // 修改创建history API
                'modifyCreateHistory',
                // 修改路由配置
                'modifyRoute',
                // 初始化数据
                'beforeRender',
                // 生成router时触发
                'onRouterCreated',
            ],
        });
        const plugins = await api.applyPlugins({
            key: 'addRuntimePlugin',
            type: api.ApplyPluginsType.add,
            initialValue: [getAppPath(paths.absSrcPath)].filter(Boolean),
        });
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'plugin.tpl'), 'utf-8'), {
                validKeys,
                runtimePath,
            }),
        });
        api.writeTmpFile({
            path: 'core/pluginRegister.js',
            content: Mustache.render(readFileSync(join(__dirname, 'pluginRegister.tpl'), 'utf-8'), {
                plugins: plugins.map((plugin, index) => ({
                    index,
                    path: winPath(plugin),
                })),
            }),
        });
    });

    api.addCoreExports(() => ({
        specifiers: ['plugin'],
        source: absoluteFilePath,
    }));
}
