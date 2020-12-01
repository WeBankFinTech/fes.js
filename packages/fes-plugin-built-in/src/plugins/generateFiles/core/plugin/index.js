import { readFileSync } from 'fs';
import { join } from 'path';
import { getFile, winPath } from '@umijs/utils';
import { runtimePath } from '../../../../utils/constants';

export default function (api) {
    const {
        paths,
        utils: { Mustache }
    } = api;

    api.onGenerateFiles(async () => {
        const validKeys = await api.applyPlugins({
            key: 'addRuntimePluginKey',
            type: api.ApplyPluginsType.add,
            initialValue: [
                'modifyClientRenderOpts',
                'rootContainer',
                'render'
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
            path: 'core/plugin.js',
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
        source: './plugin'
    }));
}
