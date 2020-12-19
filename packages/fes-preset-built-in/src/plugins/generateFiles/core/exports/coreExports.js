import { readFileSync } from 'fs';
import { join } from 'path';
import generateExports from '../../../../utils/generateExports';

export default function (api) {
    api.onGenerateFiles(async () => {
        const coreExports = await api.applyPlugins({
            key: 'addCoreExports',
            type: api.ApplyPluginsType.add,
            initialValue: []
        });

        const fesExportsHook = {}; // repeated definition
        const absoluteFilePath = 'core/coreExports.js';
        const content = `${coreExports
            .map(item => generateExports(absoluteFilePath, {
                item,
                fesExportsHook
            }))
            .join('\n')}\n`;
        const tpl = readFileSync(join(__dirname, './coreExports.tpl'), 'utf-8');
        api.writeTmpFile({
            path: absoluteFilePath,
            content: tpl.replace('CORE_EXPORTS', content)
        });
    });
}
