import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { winPath } from '@fesjs/utils';

/**
 * 获取文件夹所有JS文件路径
 * @param {string} dir
 */
function getDirFilePaths(dir) {
    if (!existsSync(dir)) {
        return [];
    }
    const dirs = readdirSync(dir);
    let pathList = [];
    for (const name of dirs) {
        const path = winPath(join(dir, name));
        const info = statSync(path);
        if (info.isDirectory()) {
            pathList = pathList.concat(getDirFilePaths(path));
        } else if (path.endsWith('.js')) {
            pathList.push(path);
        }
    }
    return pathList;
}

/**
 * 路径转驼峰
 * @param {*} path
 */
function pathToHump(path, root) {
    return path
        .replace(root, '')
        .replace('.js', '')
        .replace(RegExp('(/|\\.|-|_)\\S', 'g'), (text) => text[1].toUpperCase())
        .replace(/\S/, (text) => text.toLowerCase());
}

function parsePlugin(paths = [], root) {
    const plugins = [];
    const importPlugins = [];
    paths.forEach((path) => {
        const moduleName = pathToHump(path, root);
        importPlugins.push(`import ${moduleName} from '${path}'`);
        plugins.push(moduleName);
    });
    return { plugins, importPlugins };
}

export function parseStore(root) {
    const paths = getDirFilePaths(root);
    const pluginPaths = [];
    paths.forEach((path) => {
        if (path.indexOf('plugin') > -1) {
            pluginPaths.push(path);
        }
    });
    return {
        ...parsePlugin(pluginPaths, root),
    };
}
