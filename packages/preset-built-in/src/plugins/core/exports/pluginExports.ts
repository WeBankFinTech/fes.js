import generateExports from '../../../utils/generateExports';

export default function (api) {
    api.onGenerateFiles(async () => {
        const fesExports = await api.applyPlugins({
            key: 'addPluginExports',
            type: api.ApplyPluginsType.add,
            initialValue: [],
        });

        const fesExportsHook = {}; // repeated definition
        const absoluteFilePath = 'core/pluginExports.js';
        api.writeTmpFile({
            path: absoluteFilePath,
            content: `${fesExports
                .map((item) =>
                    generateExports(absoluteFilePath, {
                        item,
                        fesExportsHook,
                    }),
                )
                .join('\n')}\n`,
        });
    });
}
