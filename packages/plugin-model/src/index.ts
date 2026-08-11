import type { IPluginAPI } from '@fesjs/shared';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { uniq } from 'es-toolkit/compat';

import pkg from '../package.json' assert { type: 'json' };
import { getModels } from './utils/getModels';
import { getTmpFile } from './utils/getTmpFile';

const namespace = 'plugin-model';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    const {
        paths,
        utils: { Mustache, winPath },
    } = api;

    function getModelDir() {
        return api.config.singular ? 'model' : 'models';
    }

    function getModelsPath() {
        return join(paths.absSrcPath, getModelDir());
    }

    function getAllModels() {
        const srcModelsPath = getModelsPath();
        return uniq([...getModels(srcModelsPath)]);
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
        source: pkg.name,
    }));
};
