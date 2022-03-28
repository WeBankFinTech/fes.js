import { readFileSync } from 'fs';
import { join } from 'path';
import { lodash, winPath } from '@fesjs/utils';
import { getModels } from './utils/getModels';
import { getTmpFile } from './utils/getTmpFile';

const namespace = 'plugin-model';

export default (api) => {
    const {
        paths,
        utils: { Mustache },
    } = api;

    function getModelDir() {
        return api.config.singular ? 'model' : 'models';
    }

    function getModelsPath() {
        return join(paths.absSrcPath, getModelDir());
    }

    function getAllModels() {
        const srcModelsPath = getModelsPath();
        return lodash.uniq([
            ...getModels(srcModelsPath),
            // ...getModels(
            //     paths.absPagesPath,
            //     `**/${getModelDir()}/**/*.{js,jsx}`
            // ),
            // ...getModels(paths.absPagesPath, '**/*.model.{js,jsx}')
        ]);
    }

    const absCoreFilePath = join(namespace, 'core.js');
    const absRuntimeFilePath = join(namespace, 'runtime.js');
    const absInitialStateFilePath = join(namespace, 'models/initialState.js');

    api.register({
        key: 'addExtraModels',
        fn: () => [
            {
                absPath: winPath(join(paths.absTmpPath, absInitialStateFilePath)),
                namespace: '@@initialState',
            },
        ],
    });

    api.onGenerateFiles(async () => {
        const files = getAllModels();

        const additionalModels = await api.applyPlugins({
            key: 'addExtraModels',
            type: api.ApplyPluginsType.add,
            initialValue: [],
        });

        const tmpFiles = getTmpFile(files, additionalModels, paths.absSrcPath);

        api.writeTmpFile({
            path: absCoreFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'), {
                ...tmpFiles,
            }),
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/runtime.tpl'), 'utf-8'), {}),
        });

        api.writeTmpFile({
            path: absInitialStateFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'runtime/models/initialState.tpl'), 'utf-8'), {}),
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['useModel'],
            source: absCoreFilePath,
        },
    ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
