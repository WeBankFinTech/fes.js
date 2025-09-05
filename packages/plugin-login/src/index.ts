import type { IPluginAPI } from '@fesjs/shared';
import { readFileSync } from 'node:fs';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from '../package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (api: IPluginAPI) => {
    api.addRuntimePluginKey(() => 'login');
    const pkgs = Object.keys({
        ...api.pkg.dependencies,
        ...api.pkg.devDependencies,
    });
    const namespace = 'plugin-login';

    const absRuntimeFilePath = `${namespace}/runtime.js`;
    let generatedOnce = false;
    api.onGenerateFiles(() => {
        if (generatedOnce) {
            return;
        }
        generatedOnce = true;
        let content = readFileSync(join(__dirname, 'runtime', 'runtime.js'), 'utf-8');
        if (pkgs.find(item => item.includes('@fesjs/plugin-access'))) {
            content = content.replace(
                '// ACCESS',
                `export function access(memo) {
                const { loginPath } = getLoginConfig();
                memo.ignoreAccess = (memo.ignoreAccess || []).concat(loginPath);
                return memo;
            }`,
            );
        }
        api.writeTmpFile({
            path: absRuntimeFilePath,
            content,
        });
    });

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);

    api.addConfigType(() => ({
        source: pkg.name,
    }));
};
