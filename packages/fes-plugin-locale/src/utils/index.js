import { glob } from '@umijs/utils';
import { join, basename } from 'path';

export function getLocales(cwd) {
    const files = glob
        .sync('*.js', {
            cwd
        })
        .filter(
            file => !file.endsWith('.d.ts')
                && !file.endsWith('.test.js')
                && !file.endsWith('.test.jsx')
        ).map((fileName) => {
            const locale = basename(fileName, '.js');
            return {
                locale,
                message: `require('${join(cwd, fileName)}').default`
            };
        });

    return files;
}

export function getLocalesJSON(cwd) {
    const locales = getLocales(cwd);
    return JSON.stringify(locales, null, 2)
        .replace(
            /"message": ("(.+?)")/g,
            (global, m1, m2) => `"message": ${m2.replace(/\^/g, '"')}`
        )
        .replace(/\\r\\n/g, '\r\n')
        .replace(/\\n/g, '\r\n');
}
