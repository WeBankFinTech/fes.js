import { join } from 'path';
import { name } from '../package.json';

export default (api) => {
    api.addRuntimePluginKey(() => 'login');

    const namespace = 'plugin-login';

    const absRuntimeFilePath = `${namespace}/runtime.js`;
    let generatedOnce = false;
    api.onGenerateFiles(() => {
        if (generatedOnce) return;
        generatedOnce = true;
        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
        });
    });

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    api.addConfigType(() => ({
        source: name,
    }));
};
