import { readFileSync } from 'fs';
import { join } from 'path';
import { name } from '../package.json';

const namespace = 'plugin-model';

export default (api) => {
    const {
        paths,
        utils: { Mustache },
    } = api;

    const { lodash, winPath } = require('@fesjs/utils');
    const { getModels } = require('./utils/getModels');
    const { getTmpFile } = require('./utils/getTmpFile');

    function getModelDir() {
        return api.config.singular ? 'model' : 'models';
    }

    function getModelsPath() {
        return join(paths.absSrcPath, getModelDir());
    }

    function getAllModels() {
        const srcModelsPath = getModelsPath();
        return lodash.uniq([...getModels(srcModelsPath)]);
    }

    const absCoreFilePath = join(namespace, 'core.js');
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

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl'],
        });
    });

    api.addPluginExports(() => [
        {
            specifiers: ['useModel'],
            source: absCoreFilePath,
        },
    ]);

    api.addConfigType(() => ({
        source: name,
    }));
};
