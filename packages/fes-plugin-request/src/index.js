import { join } from 'path';
import { name } from '../package.json';

export default (api) => {
    api.addRuntimePluginKey(() => 'request');

    const namespace = 'plugin-request';
    const absoluteFilePath = `${namespace}/request.js`;

    let generatedOnce = false;
    api.onGenerateFiles(() => {
        if (generatedOnce) return;
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
        source: name,
        runtime: ['RequestRuntimeConfig'],
    }));
};
