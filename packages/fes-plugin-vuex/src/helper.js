import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parser, winPath } from '@fesjs/utils';

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
        }
        else if (path.endsWith('.js')) {
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
        .replace(RegExp('(/|\\.|-|_)\\S', 'g'), text => text[1].toUpperCase())
        .replace(/\S/, text => text.toLowerCase());
}

/**
 * 获取vuex模块的mutations、actions、getters类型
 * @param {*} ast
 * @param {*} name
 */
function getModelTypes(ast, name, namespace = '') {
    const types = {
        mutations: {},
        actions: {},
        getters: {},
    };
    let namespaced = false;
    if (ast.type !== 'ObjectExpression') { return types; }
    ast.properties.forEach((node) => {
        if (node.key.name === 'namespaced' && node.value.value) {
            namespaced = true;
            return;
        }
        if (Object.keys(types).includes(node.key.name)) {
            let type = types[node.key.name];
            if (namespaced) {
                type = types[node.key.name][name];
                if (!type) {
                    type = types[node.key.name][name] = {};
                }
            }
            node.value.properties.forEach((prop) => {
                const key = prop.key && prop.key.name;
                if (key) {
                    type[key] = `${namespace}${namespaced ? `${name}/` : ''}${key}`;
                }
            });
            return;
        }
        if (node.key.name === 'modules') {
            node.value.properties.forEach((prop) => {
                const subTypes = getModelTypes(prop.value, prop.key.name, `${namespace}${namespaced ? `${name}/` : ''}`);
                Object.keys(types).forEach((key) => {
                    if (namespaced) {
                        types[key][name] = {
                            ...subTypes[key],
                            ...types[key][name],
                        };
                    }
                    else {
                        types[key] = {
                            ...subTypes[key],
                            ...types[key],
                        };
                    }
                });
            });
        }
    });
    return types;
}

/**
 * 解析模块
 * @param {*} paths
 * @param {*} root
 */
function parseModel(paths = [], root) {
    const modules = [];
    const importModules = [];
    let MUTATION_TYPES = {};
    let ACTION_TYPES = {};
    let GETTER_TYPES = {};
    paths.forEach((path) => {
        const moduleName = pathToHump(path, root);
        importModules.push(`import ${moduleName} from '${path}'`);
        modules.push(moduleName);
        const content = readFileSync(path).toString('utf-8');
        let ast;
        try {
            ast = parser.parse(content, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript'],
            });
            ast = ast.program.body.filter(body => body.type === 'ExportDefaultDeclaration')[0];
        }
        catch (err) { }
        if (ast) {
            const { mutations, actions, getters } = getModelTypes(ast.declaration, moduleName);
            MUTATION_TYPES = {
                ...mutations,
                ...MUTATION_TYPES,
            };
            ACTION_TYPES = {
                ...actions,
                ...ACTION_TYPES,
            };
            GETTER_TYPES = {
                ...getters,
                ...GETTER_TYPES,
            };
        }
    });
    return {
        modules,
        importModules,
        MUTATION_TYPES,
        ACTION_TYPES,
        GETTER_TYPES,
    };
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
    const modelPaths = [];
    const pluginPaths = [];
    paths.forEach((path) => {
        if (path.includes('plugin')) {
            pluginPaths.push(path);
        }
        else {
            modelPaths.push(path);
        }
    });
    return {
        ...parsePlugin(pluginPaths, root),
        ...parseModel(modelPaths, root),
    };
}
