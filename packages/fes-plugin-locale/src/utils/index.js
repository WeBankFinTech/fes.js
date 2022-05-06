import { glob } from '@fesjs/utils';
import { join, basename } from 'path';

export function getLocales(cwd) {
    const files = glob
        .sync('*.js', {
            cwd,
        })
        .filter((file) => !file.endsWith('.d.ts') && !file.endsWith('.test.js') && !file.endsWith('.test.jsx'))
        .map((fileName) => {
            const locale = basename(fileName, '.js');
            const importName = locale.replace('-', '');
            return {
                importName,
                locale,
                path: join(cwd, fileName),
            };
        });

    return files;
}
