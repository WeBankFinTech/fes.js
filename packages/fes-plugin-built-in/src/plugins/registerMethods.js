import assert from 'assert';
import { dirname, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export default function (api) {
    [
        'onExit',
        'onGenerateFiles',
        'addPluginExports',
        'addCoreExports',
        'addRuntimePluginKey',
        'addRuntimePlugin',
        'addEntryImportsAhead',
        'addEntryImports',
        'addEntryCodeAhead',
        'addEntryCode',
        'addBeforeMiddewares',
        'addMiddewares',
        'modifyRoutes',
        'modifyBundler',
        'modifyBundleImplementor',
        'modifyBundleConfigOpts',
        'modifyBundleConfig',
        'modifyBundleConfigs',
        'modifyBabelOpts',
        'modifyBabelPresetOpts',
        'chainWebpack',
        'addTmpGenerateWatcherPaths'
    ].forEach((name) => {
        api.registerMethod({ name });
    });

    api.registerMethod({
        name: 'writeTmpFile',
        fn({
            path,
            content
        }) {
            assert(
                api.stage >= api.ServiceStage.pluginReady,
                'api.writeTmpFile() should not execute in register stage.',
            );
            const absPath = join(api.paths.absTmpPath, path);
            api.utils.mkdirp.sync(dirname(absPath));
            if (!existsSync(absPath) || readFileSync(absPath, 'utf-8') !== content) {
                writeFileSync(absPath, content, 'utf-8');
            }
        }
    });
}
