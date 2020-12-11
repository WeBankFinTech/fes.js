
import { readFileSync } from 'fs';
import { join } from 'path';
import { lodash, winPath } from '@umijs/utils';
import { getModels } from './utils/getModels';
import { getTmpFile } from './utils/getTmpFile';

const namespace = 'plugin-state';

export default (api) => {
    const {
        paths,
        utils: { Mustache }
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
            ...getModels(
                paths.absPagesPath,
                `**/${getModelDir()}/**/*.{js,jsx}`,
            ),
            ...getModels(paths.absPagesPath, '**/*.model.{js,jsx}')
        ]);
    }

    const absCoreFilePath = join(namespace, 'core.js');
    const absRuntimeFilePath = join(namespace, 'runtime.js');
    const absInitlaStateFilePath = join(namespace, 'models/initialState.js');

    api.register({
        key: 'addExtraModels',
        fn: () => [{
            absPath: winPath(join(paths.absTmpPath, absInitlaStateFilePath)),
            namespace: '@@initialState'
        }]
    });

    api.onGenerateFiles(async () => {
        const files = getAllModels();

        const additionalModels = await api.applyPlugins({
            key: 'addExtraModels',
            type: api.ApplyPluginsType.add,
            initialValue: []
        });

        const tmpFiles = getTmpFile(files, additionalModels, paths.absSrcPath);
        console.log(tmpFiles);

        api.writeTmpFile({
            path: absCoreFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'template/core.tpl'), 'utf-8'), {
                ...tmpFiles
            })
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'template/runtime.tpl'), 'utf-8'), {
            })
        });

        api.writeTmpFile({
            path: absInitlaStateFilePath,
            content: Mustache.render(readFileSync(join(__dirname, 'models/initialState.tpl'), 'utf-8'), {
            })
        });
    });

    // 注册 getInitialState 方法
    api.addRuntimePluginKey(() => 'getInitialState');

    // 注册 initialStateConfig 方法
    api.addRuntimePluginKey(() => 'initialStateConfig');

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
