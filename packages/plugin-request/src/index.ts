import type { IPluginAPI } from '@fesjs/shared';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from '../package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    api.addRuntimePluginKey(() => 'request');

    const namespace = 'plugin-request';
    const absoluteFilePath = `${namespace}/request.js`;

    let generatedOnce = false;
    api.onGenerateFiles(() => {
        if (generatedOnce) {
            return;
        }
        generatedOnce = true;
        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'template'),
        });
    });

    api.addPluginExports(() => [
        {
            exportAll: true,
            source: absoluteFilePath,
        },
    ]);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
