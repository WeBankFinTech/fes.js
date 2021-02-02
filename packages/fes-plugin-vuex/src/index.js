import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const namespace = 'plugin-vuex';

export default (api) => {
    const {
        paths,
        utils: { Mustache }
    } = api;

    /**
     * 获取文件夹所有JS文件路径
     * @param {string} dir
     */
    function getDirFilePaths(dir) {
        const dirs = readdirSync(dir);
        let pathList = [];
        for (const name of dirs) {
            const path = join(dir, name);
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
     * 解析vuex模块及插件文件
     * @param {Array<string>} pathList 文件路径
     * @param {string} root
     */
    function parseStore(pathList, root) {
        const store = {
            modules: [],
            plugins: [],
            importModules: [],
            importPlugins: []
        };
        for (const path of pathList) {
            const moduleName = path.replace(root, '').replace('.js', '').replace(/(\/|\.|-|_)\S/g, text => text[1].toUpperCase());
            if (path.indexOf('plugin') > -1) {
                store.importPlugins.push(`import ${moduleName} from '${path}'`);
                store.plugins.push(moduleName);
            } else {
                store.importModules.push(`import ${moduleName} from '${path}'`);
                store.modules.push(`${moduleName}`);
            }
        }
        return store;
    }

    const absRuntimeFilePath = join(namespace, 'runtime.js');
    api.onGenerateFiles(() => {
        const root = join(paths.absSrcPath, 'stores');
        const storePaths = getDirFilePaths(root);
        const store = parseStore(storePaths, join(root, '/'));

        // 文件写出
        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: Mustache.render(
                readFileSync(join(__dirname, 'runtime/runtime.tpl'), 'utf-8'),
                {
                    IMPORT_MODULES: store.importModules.join('\n'),
                    IMPORT_PLUGINS: store.importPlugins.join('\n'),
                    MODULES: `{ ${store.modules.join(', ')} }`,
                    PLUGINS: `[${store.plugins.join(', ')}]`
                }
            )
        });

        api.copyTmpFiles({
            namespace,
            path: join(__dirname, 'runtime'),
            ignore: ['.tpl']
        });
    });
    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
};
