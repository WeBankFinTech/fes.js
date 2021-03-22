import assert from 'assert';
import { dirname, join } from 'path';
import {
    existsSync, statSync, readFileSync, writeFileSync, copyFileSync
} from 'fs';

export default function (api) {
    [
        'onExit',
        'onGenerateFiles',
        'addPluginExports',
        'addCoreExports',
        'addRuntimePluginKey',
        'addRuntimePlugin',
        'addDevScripts',
        'addEntryImportsAhead',
        'addEntryImports',
        'addEntryCodeAhead',
        'addEntryCode',
        'addBeforeMiddlewares',
        'addHTMLHeadScripts',
        'addMiddlewares',
        'modifyRoutes',
        'modifyBundler',
        'modifyBundleImplementor',
        'modifyBundleConfigOpts',
        'modifyBundleConfig',
        'modifyBabelOpts',
        'modifyBabelPresetOpts',
        'chainWebpack',
        'addTmpGenerateWatcherPaths',
        'modifyPublicPathStr'
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
                'api.writeTmpFile() should not execute in register stage.'
            );
            const absPath = join(api.paths.absTmpPath, path);
            api.utils.mkdirp.sync(dirname(absPath));
            if (!existsSync(absPath) || readFileSync(absPath, 'utf-8') !== content) {
                writeFileSync(absPath, content, 'utf-8');
            }
        }
    });

    api.registerMethod({
        name: 'copyTmpFiles',
        fn({
            namespace, path, ignore
        }) {
            assert(
                api.stage >= api.ServiceStage.pluginReady,
                'api.copyTmpFiles() should not execute in register stage.'
            );
            assert(
                path,
                'api.copyTmpFiles() should has param path'
            );
            assert(
                namespace,
                'api.copyTmpFiles() should has param namespace'
            );
            const files = api.utils.glob.sync('**/*', {
                cwd: path
            });
            const base = join(api.paths.absTmpPath, namespace);
            files.forEach((file) => {
                const source = join(path, file);
                const target = join(base, file);
                if (statSync(source).isDirectory()) {
                    api.utils.mkdirp.sync(target);
                } else if (Array.isArray(ignore)) {
                    if (!ignore.some(pattern => new RegExp(pattern).test(file))) {
                        copyFileSync(source, target);
                    }
                } else {
                    copyFileSync(source, target);
                }
            });
        }
    });
}
