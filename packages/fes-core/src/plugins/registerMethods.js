import assert from 'assert';
import { dirname, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export default function (api) {
    [
        'onGenerateFiles',
        'addFesExports',
        'addRuntimePluginKey',
        'addRuntimePlugin',
        'addEntryImportsAhead',
        'addEntryImports',
        'addEntryCodeAhead',
        'addEntryCode',
        'modifyRoutes'
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
