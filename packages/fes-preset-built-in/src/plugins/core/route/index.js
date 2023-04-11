import { readdirSync, statSync, readFileSync } from 'fs';
import { join, extname, basename } from 'path';
import { lodash, parser, generator, logger, winPath } from '@fesjs/utils';
import { parse } from '@vue/compiler-sfc';
import { runtimePath } from '../../../utils/constants';

//   pages
//  ├── index.vue         # 根路由页面 路径 /
//  ├── [...slug].vue     # 模糊匹配 路径 /:slug(.*)
//  ├── a.vue             # 路径 /a
//  ├── b
//  │   ├── index.vue     # 路径 /b
//  │   ├── [slug].vue       # 动态路由 /b/:slug
//  │   └── c.vue         # 路径 /b/c
//  └── layout.vue        # 根路由下所有page共用的外层

const isProcessFile = function (path) {
    const ext = extname(path);
    return statSync(path).isFile() && ['.vue', '.jsx', '.tsx'].includes(ext);
};

const isProcessDirectory = function (path, item) {
    const component = winPath(join(path, item));
    return statSync(component).isDirectory() && !['components'].includes(item);
};

const checkHasLayout = function (path) {
    const dirList = readdirSync(path);
    return dirList.some((item) => {
        if (!isProcessFile(winPath(join(path, item)))) {
            return false;
        }
        const ext = extname(item);
        const fileName = basename(item, ext);
        return fileName === 'layout';
    });
};

const getRouteName = function (parentRoutePath, fileName) {
    const routeName = winPath(join(parentRoutePath, fileName));
    return routeName
        .slice(1)
        .replace(/\//g, '_')
        .replace(/@/g, '_')
        .replace(/:/g, '_')
        .replace(/\*/g, 'FUZZYMATCH')
        .replace(/\[([a-zA-Z]+)\]/, '_$1')
        .replace(/\[...([a-zA-Z]*)\]/, 'FUZZYMATCH-$1');
};

const getRoutePath = function (parentRoutePath, fileName, isFile = true) {
    // /index.vue -> /
    if (isFile && fileName === 'index') {
        fileName = '';
    }
    // /@id.vue -> /:id
    if (fileName.startsWith('@')) {
        logger.warn(`[WARNING]: filename or directory ${fileName} is deprecated, please use [${fileName.replace(/@/, '')}]`);
        fileName = fileName.replace(/@/, ':');
    }
    // /*.vue -> :pathMatch(.*)
    if (fileName.includes('*')) {
        logger.warn(`[WARNING]: filename or directory ${fileName} is deprecated, please use ${fileName.replace('*', '[...]')}`);
        fileName = fileName.replace('*', ':pathMatch(.*)');
    }
    // /[slug].vue -> /:slug
    if (/\[[a-zA-Z]+\]/.test(fileName)) {
        fileName = fileName.replace(/\[([a-zA-Z]+)\]/g, ':$1');
    }
    // /[...slug].vue -> /:slug(.*)
    if (/\[...[a-zA-Z]*\]/.test(fileName)) {
        fileName = fileName.replace(/\[...([a-zA-Z]*)\]/, ':$1(.*)').replace(':(.*)', ':pathMatch(.*)');
    }
    return winPath(join(parentRoutePath, fileName));
};

function getRouteMeta(content) {
    try {
        const ast = parser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });
        const defineRouteExpression = ast.program.body.filter(
            (expression) =>
                expression.type === 'ExpressionStatement' &&
                expression.expression.type === 'CallExpression' &&
                expression.expression.callee.name === 'defineRouteMeta',
        )[0];
        if (defineRouteExpression) {
            const argument = generator(defineRouteExpression.expression.arguments[0]);
            // eslint-disable-next-line no-eval
            const fn = eval(`() => (${argument.code})`);
            return fn();
        }
    } catch (err) {}
    return null;
}

let cacheGenRoutes = {};

// TODO 约定 layout 目录作为布局文件夹，
const genRoutes = function (parentRoutes, path, parentRoutePath) {
    const dirList = readdirSync(path);
    const hasLayout = checkHasLayout(path);
    const layoutRoute = {
        children: [],
    };
    if (hasLayout) {
        layoutRoute.path = parentRoutePath;
        parentRoutes.push(layoutRoute);
    }
    dirList.forEach((item) => {
        // 文件或者目录的绝对路径
        const filePath = winPath(join(path, item));
        if (isProcessFile(filePath)) {
            const ext = extname(item);
            const fileName = basename(item, ext);
            // 路由的path
            const routePath = getRoutePath(parentRoutePath, fileName);
            if (cacheGenRoutes[routePath]) {
                logger.warn(
                    `[WARNING]: The file path: ${routePath}(.jsx/.tsx/.vue) conflict in router，will only use ${routePath}.tsx or ${routePath}.jsx，please remove one of.`,
                );
                return;
            }
            cacheGenRoutes[routePath] = true;

            // 路由名称
            const routeName = getRouteName(parentRoutePath, fileName);
            const componentPath = winPath(filePath);

            const content = readFileSync(filePath, 'utf-8');
            let routeMeta = {};
            if (ext === '.vue') {
                const { descriptor } = parse(content);
                const routeMetaBlock = descriptor.customBlocks.find((b) => b.type === 'config');
                try {
                    routeMeta = routeMetaBlock?.content ? JSON.parse(routeMetaBlock.content) : {};
                } catch (e) {
                    console.warn(`config: ${routeMetaBlock.content} 必须为 json 格式`);
                }
                if (descriptor.script) {
                    routeMeta = getRouteMeta(descriptor.script.content) || routeMeta;
                }
                // 优先使用 descriptor.script， 兼容 script 和 script setup 同时存在的情况
                if (descriptor.scriptSetup && lodash.isEmpty(routeMeta)) {
                    routeMeta = getRouteMeta(descriptor.scriptSetup.content) || routeMeta;
                }
            } else if (ext === '.jsx' || ext === '.tsx') {
                routeMeta = getRouteMeta(content) || {};
            }

            const routeConfig = {
                path: routePath,
                component: componentPath,
                name: routeMeta.name || routeName,
                meta: routeMeta,
            };
            if (hasLayout) {
                if (fileName === 'layout') {
                    layoutRoute.component = componentPath;
                } else {
                    layoutRoute.children.push(routeConfig);
                }
            } else {
                parentRoutes.push(routeConfig);
            }
        }
    });

    dirList.forEach((item) => {
        if (isProcessDirectory(path, item)) {
            // 文件或者目录的绝对路径
            const nextPath = winPath(join(path, item));
            const nextParentRouteUrl = getRoutePath(parentRoutePath, item, false);
            if (hasLayout) {
                genRoutes(layoutRoute.children, nextPath, nextParentRouteUrl);
            } else {
                genRoutes(parentRoutes, nextPath, nextParentRouteUrl);
            }
        }
    });
};

/**
 * 智能路由
 * 1、路由的路径是多个“/”组成的字符串，使用“/”分割后得到不同的子项
 * 2、计算子项个数，用个数乘以4，计入得分
 * 3、判断子项是否是静态的，即不包含“：”、“*”等特殊字符串，若是计入3分。
 * 4、判断子项是否是动态的，即包含“：”特殊字符，若是计入2分。
 * 5、判断子项是否是模糊匹配，即包含“*”特殊字符，若是扣除1分。
 * 6、判断子项是否是根端，即只是“/”，若是计入1分。

 * @param {*} routes
 */
const rank = function (routes) {
    routes.forEach((item) => {
        const path = item.path;
        let arr = path.split('/');
        if (arr[0] === '') {
            arr = arr.slice(1);
        }
        let count = 0;
        arr.forEach((sonPath) => {
            count += 4;
            if (sonPath.indexOf(':') !== -1 && sonPath.indexOf('(.*)') === -1) {
                count += 2;
            } else if (sonPath.indexOf('(.*)') !== -1) {
                count -= 1;
            } else if (sonPath === '') {
                count += 1;
            } else {
                count += 3;
            }
        });
        item.count = count;
        if (item.children && item.children.length) {
            rank(item.children);
        }
    });
    routes.sort((a, b) => b.count - a.count);
};

const getRoutes = function ({ config, absPagesPath }) {
    // 用户配置了routes则使用用户配置的
    const configRoutes = config.router.routes;
    if (configRoutes && configRoutes.length > 0) return configRoutes;

    const routes = [];
    cacheGenRoutes = {};
    genRoutes(routes, absPagesPath, '/');
    rank(routes);
    return routes;
};

function genComponentName(component, paths) {
    const componentName = lodash.camelCase(component.replace(paths.absPagesPath, '').replace('.vue', ''));
    if (/^\d+/.test(componentName)) {
        return `numPage${componentName}`;
    }
    return componentName;
}

function isFunctionComponent(component) {
    // eslint-disable-next-line
    return (
        /^\((.+)?\)(\s+)?=>/.test(component)
        || /^function([^(]+)?\(([^)]+)?\)([^{]+)?{/.test(component)
    );
}

const getRoutesJSON = function ({ routes, config, paths }) {
    // 因为要往 routes 里加无用的信息，所以必须 deep clone 一下，避免污染
    const clonedRoutes = lodash.cloneDeep(routes);

    const importList = [];

    function replacer(key, value) {
        if (key !== 'component') {
            return value;
        }
        if (isFunctionComponent(value)) return value;
        if (config.dynamicImport) {
            // TODO 针对目录进行 chunk 划分，import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
            return `() => import('${value}')`;
        }
        const componentName = genComponentName(value, paths);
        importList.push(`import ${componentName} from '${value}'`);
        return componentName;
    }

    const routesJSON = JSON.stringify(clonedRoutes, replacer, 2)
        .replace(/"component": ("(.+?)")/g, (global, m1, m2) => `"component": ${m2.replace(/\^/g, '"')}`)
        .replace(/\\r\\n/g, '\r\n')
        .replace(/\\n/g, '\r\n');

    return {
        importList,
        routesJSON,
    };
};

export default function (api) {
    api.describe({
        key: 'router',
        config: {
            schema(joi) {
                return joi.object({
                    base: joi.string(),
                    routes: joi.array(),
                    mode: joi.string(),
                });
            },
            default: {
                mode: 'hash',
            },
        },
    });

    api.registerMethod({
        name: 'getRoutes',
        async fn() {
            return api.applyPlugins({
                key: 'modifyRoutes',
                type: api.ApplyPluginsType.modify,
                initialValue: getRoutes({
                    config: api.config,
                    absPagesPath: api.paths.absPagesPath,
                }),
            });
        },
    });

    api.registerMethod({
        name: 'getRoutesJSON',
        async fn(routes) {
            return getRoutesJSON({ routes: await (routes || api.getRoutes()), config: api.config, paths: api.paths });
        },
    });

    const {
        utils: { Mustache },
    } = api;

    const namespace = 'core/routes';

    const absCoreFilePath = join(namespace, 'routes.js');
    const absExportsFilePath = join(namespace, 'routeExports.js');
    const absRuntimeFilePath = join(namespace, 'runtime.js');

    const historyType = {
        history: 'createWebHistory',
        hash: 'createWebHashHistory',
        memory: 'createMemoryHistory',
    };

    api.onGenerateFiles(async () => {
        const routesTpl = readFileSync(join(__dirname, 'template/routes.tpl'), 'utf-8');
        const routes = await api.getRoutesJSON();
        api.writeTmpFile({
            path: absCoreFilePath,
            content: Mustache.render(routesTpl, {
                COMPONENTS_IMPORT: routes.importList.join('\n'),
                routes: routes.routesJSON,
            }),
        });

        const routeExportsTpl = readFileSync(join(__dirname, 'template/routeExports.tpl'), 'utf-8');
        api.writeTmpFile({
            path: absExportsFilePath,
            content: Mustache.render(routeExportsTpl, {
                runtimePath,
                routerBase: api.config.router?.base,
                CREATE_HISTORY: historyType[api.config.router.mode] || 'createWebHashHistory',
            }),
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: readFileSync(join(__dirname, 'template/runtime.tpl'), 'utf-8'),
        });
    });

    api.addCoreExports(() => [
        {
            specifiers: ['getRouter', 'getHistory', 'destroyRouter', 'defineRouteMeta'],
            source: absExportsFilePath,
        },
    ]);

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
}
