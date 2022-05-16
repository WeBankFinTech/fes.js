import { glob } from '@fesjs/utils';
import { getValidFiles } from '.';

export function getModels(cwd, pattern) {
    const files = glob
        .sync(pattern || '**/*.{js,jsx,ts,tsx}', {
            cwd
        })
        .filter(
            file => !file.endsWith('.d.ts')
                && !file.endsWith('.test.js')
                && !file.endsWith('.test.jsx')
        );

    return getValidFiles(files, cwd);
}
