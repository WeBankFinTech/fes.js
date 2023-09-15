import { join, basename } from 'path';
import { glob, winPath } from '@fesjs/utils';

const ignore = /\.(d\.ts|\.test\.(js|ts))$/;

const getRouteName = function (path) {
    const routeName = winPath(path);
    return routeName
        .replace(/\//g, '_')
        .replace(/@/g, '_')
        .replace(/:/g, '_')
        .replace(/-/g, '_')
        .replace(/\*/g, 'ALL')
        .replace(/\[([a-zA-Z]+)\]/, '_$1')
        .replace(/\[...([a-zA-Z]*)\]/, 'FUZZYMATCH-$1');
};

export function getLocales(cwd) {
    const map = {};
    const files = [];
    glob.sync('**/*.js', {
        cwd,
    })
        .filter((file) => !ignore.test(file))
        .forEach((fileName) => {
            const locale = basename(fileName, '.js');
            const importName = getRouteName(fileName).replace('.js', '');
            const result = {
                importName,
                // import语法的路径，必须处理win
                path: winPath(join(cwd, fileName)),
            };
            files.push(result);
            if (!map[locale]) {
                map[locale] = [];
            }
            map[locale].push(importName);
        });

    return {
        locales: Object.keys(map).map((key) => ({ locale: key, importNames: map[key] })),
        files,
    };
}
