import { readFileSync } from 'fs';
import { join } from 'path';
import { getFile, winPath } from '@umijs/utils';
import { runtimePath } from '../../../../utils/constants';

export default function (api) {
    const {
        paths,
        utils: { Mustache }
    } = api;

    const absoluteFilePath = 'core/plugin.js';

    api.onGenerateFiles(async () => {
        const validKeys = await api.applyPlugins({
            key: 'addRuntimePluginKey',
            type: api.ApplyPluginsType.add,
            initialValue: [
                'modifyClientRenderOpts',
                'rootContainer',
                // 渲染
                'render',
                // 修改路由
                'patchRoutes',
                // 生成router时触发
                'onRouterCreated'
            ]
        });
        const plugins = await api.applyPlugins({
            key: 'addRuntimePlugin',
            type: api.ApplyPluginsType.add,
            initialValue: [
                getFile({
                    base: paths.absSrcPath,
                    fileNameWithoutExt: 'app',
                    type: 'javascript'
                })?.path
            ].filter(Boolean)
        });
        api.writeTmpFile({
            path: absoluteFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'plugin.tpl'), 'utf-8'),
                {
                    validKeys,
                    runtimePath
                },
            )
        });
        api.writeTmpFile({
            path: 'core/pluginRegister.js',
            content: Mustache.render(
                readFileSync(join(__dirname, 'pluginRegister.tpl'), 'utf-8'),
                {
                    plugins: plugins.map((plugin, index) => ({
                        index,
                        path: winPath(plugin)
                    }))
                },
            )
        });
    });

    api.addExports(() => ({
        specifiers: ['plugin'],
        source: absoluteFilePath
    }));
}
