import { globSync } from 'glob';
import { getValidFiles } from '.';

export function getModels(cwd: string, pattern?: string) {
    const files = globSync(pattern || '**/*.{js,jsx,ts,tsx}', {
        cwd,
    })
        .filter(
            file => !file.endsWith('.d.ts')
                && !file.endsWith('.test.js')
                && !file.endsWith('.test.jsx'),
        );

    return getValidFiles(files, cwd);
}
