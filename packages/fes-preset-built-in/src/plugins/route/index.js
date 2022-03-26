import { readdirSync, statSync, readFileSync } from 'fs';
import { join, extname, posix, basename } from 'path';
import { lodash, parser, generator } from '@fesjs/utils';
import { parse } from '@vue/compiler-sfc';
import { Logger } from '@fesjs/compiler';
import { runtimePath } from '../../utils/constants';

const logger = new Logger('fes:router');

//   pages
//  ├── index.vue         # 根路由页面 路径 /
//  ├── *.vue             # 模糊匹配 路径 *
//  ├── a.vue             # 路径 /a
//  ├── b
//  │   ├── index.vue     # 路径 /b
//  │   ├── @id.vue       # 动态路由 /b/:id
//  │   └── c.vue         # 路径 /b/c
//  └── layout.vue        # 根路由下所有page共用的外层

const isProcessFile = function (path) {
    const ext = extname(path);
    return statSync(path).isFile() && ['.vue', '.jsx', '.tsx'].includes(ext);
};

const isProcessDirectory = function (path, item) {
    const component = join(path, item);
    return statSync(component).isDirectory() && !['components'].includes(item);
};

const checkHasLayout = function (path) {
    const dirList = readdirSync(path);
    return dirList.some((item) => {
        if (!isProcessFile(join(path, item))) {
            return false;
        }
        const ext = extname(item);
        const fileName = basename(item, ext);
        return fileName === 'layout';
    });
};

const getRouteName = function (parentRoutePath, fileName) {
    const routeName = posix.join(parentRoutePath, fileName);
    return routeName.slice(1).replace(/\//g, '_').replace(/@/g, '_').replace(/\*/g, 'FUZZYMATCH');
};

const getPagePathPrefix = (config) => `@/${config.singular ? 'page' : 'pages'}`;

const getComponentPath = function (parentRoutePath, fileName, config) {
    return posix.join(`${getPagePathPrefix(config)}/`, parentRoutePath, fileName);
};

const getRoutePath = function (parentRoutePath, fileName) {
    // /index.vue -> /
    if (fileName === 'index') {
        fileName = '';
    }
    // /@id.vue -> /:id
    if (fileName.startsWith('@')) {
        fileName = fileName.replace(/@/, ':');
    }
    // /*.vue -> :pathMatch(.*)
    if (fileName.includes('*')) {
        fileName = fileName.replace('*', ':pathMatch(.*)');
    }
    return posix.join(parentRoutePath, fileName);
};

function getRouteMeta(content) {
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
        return JSON.parse(argument.code.replace(/'/g, '"').replace(/(\S+):/g, (global, m1) => `"${m1}":`));
    }
    return null;
}

let cacheGenRoutes = {};

// TODO 约定 layout 目录作为布局文件夹，
const genRoutes = function (parentRoutes, path, parentRoutePath, config) {
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
        const component = join(path, item);
        if (isProcessFile(component)) {
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
            const componentPath = getComponentPath(parentRoutePath, ext === '.vue' ? `${fileName}${ext}` : fileName, config);

            let content = readFileSync(component, 'utf-8');
            let routeMeta = {};
            if (ext === '.vue') {
                const { descriptor } = parse(content);
                const routeMetaBlock = descriptor.customBlocks.find((b) => b.type === 'config');
                routeMeta = routeMetaBlock?.content ? JSON.parse(routeMetaBlock.content) : {};
                if (descriptor.script) {
                    content = descriptor.script.content;
                    routeMeta = getRouteMeta(content) || routeMeta;
                }
            }
            if (ext === '.jsx' || ext === '.tsx') {
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
            const component = join(path, item);
            const nextParentRouteUrl = posix.join(parentRoutePath, item);
            if (hasLayout) {
                genRoutes(layoutRoute.children, component, nextParentRouteUrl, config);
            } else {
                genRoutes(parentRoutes, component, nextParentRouteUrl, config);
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
            if (sonPath.indexOf(':') !== -1 && sonPath.indexOf(':pathMatch(.*)') === -1) {
                count += 2;
            } else if (sonPath.indexOf(':pathMatch(.*)') !== -1) {
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
    genRoutes(routes, absPagesPath, '/', config);
    rank(routes);
    return routes;
};

function genComponentName(component, config) {
    return lodash.camelCase(component.replace(getPagePathPrefix(config), '').replace('.vue', ''));
}

function isFunctionComponent(component) {
    // eslint-disable-next-line
    return (
        /^\((.+)?\)(\s+)?=>/.test(component)
        || /^function([^(]+)?\(([^)]+)?\)([^{]+)?{/.test(component)
    );
}

const getRoutesJSON = function ({ routes, config }) {
    // 因为要往 routes 里加无用的信息，所以必须 deep clone 一下，避免污染
    const clonedRoutes = lodash.cloneDeep(routes);

    function replacer(key, value) {
        switch (key) {
            case 'component':
                if (isFunctionComponent(value)) return value;
                if (config.dynamicImport) {
                    // TODO 针对目录进行 chunk 划分，import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
                    return `() => import('${value}')`;
                }
                return genComponentName(value, config);
            default:
                return value;
        }
    }

    return JSON.stringify(clonedRoutes, replacer, 2)
        .replace(/"component": ("(.+?)")/g, (global, m1, m2) => `"component": ${m2.replace(/\^/g, '"')}`)
        .replace(/\\r\\n/g, '\r\n')
        .replace(/\\n/g, '\r\n');
};

function genComponentImportExpression(routes, config) {
    if (config.dynamicImport) {
        return [];
    }

    const result = [];
    for (const routeConfig of routes) {
        if (routeConfig.children) {
            result.push(...genComponentImportExpression(routeConfig.children, config));
        }

        if (routeConfig.component && !isFunctionComponent(routeConfig.component)) {
            result.push(`import ${genComponentName(routeConfig.component, config)} from '${routeConfig.component}';`);
        }
    }

    return result;
}

export default function (api) {
    api.describe({
        key: 'router',
        config: {
            schema(joi) {
                return joi.object({
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
            return getRoutesJSON({ routes: await (routes || api.getRoutes()), config: api.config });
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
        const routes = await api.getRoutes();
        api.writeTmpFile({
            path: absCoreFilePath,
            content: Mustache.render(routesTpl, {
                COMPONENTS_IMPORT: genComponentImportExpression(routes, api.config).join('\n'),
                routes: await api.getRoutesJSON(),
            }),
        });

        const routeExportsTpl = readFileSync(join(__dirname, 'template/routeExports.tpl'), 'utf-8');
        api.writeTmpFile({
            path: absExportsFilePath,
            content: Mustache.render(routeExportsTpl, {
                runtimePath,
                config: api.config,
                routerBase: api.config.base,
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
