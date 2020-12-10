
import { readFileSync } from 'fs';
import { join } from 'path';

const namespace = 'plugin-initstate';

export default (api) => {
    api.addRuntimePluginKey(() => 'initstate');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(() => {
        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: readFileSync(join(__dirname, 'template/runtime.tpl'), 'utf-8')
        });
    });


    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
