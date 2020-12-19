import { readdirSync, statSync, readFileSync } from 'fs';
import {
    join, extname, posix, basename
} from 'path';
import { lodash } from '@umijs/utils';
import { parse } from '@vue/compiler-sfc';
import { runtimePath } from '../../../utils/constants';

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
    return statSync(path).isFile() && ['.vue'].includes(ext);
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
    return routeName
        .slice(1)
        .replace(/\//g, '_')
        .replace(/@/g, '_')
        .replace(/\*/g, 'FUZZYMATCH');
};

const getComponentPath = function (parentRoutePath, fileName) {
    return posix.join('@/pages/', parentRoutePath, fileName);
};

const getRoutePath = function (parentRoutePath, fileName) {
    // /index.vue -> /
    if (fileName === 'index') {
        fileName = '';
    }
    let routePath = posix.join(parentRoutePath, fileName);
    // /@id.vue -> /:id
    routePath = routePath.replace(/@/g, ':');
    // /*.vue -> *
    if (routePath === '/*') {
        routePath = '*';
    }
    return routePath;
};

// TODO 约定 layout 目录作为布局文件夹，
const genRoutes = function (parentRoutes, path, parentRoutePath) {
    const dirList = readdirSync(path);
    const hasLayout = checkHasLayout(path);
    const layoutRoute = {
        children: []
    };
    if (hasLayout) {
        layoutRoute.path = parentRoutePath;
        parentRoutes.push(layoutRoute);
    }
    dirList.forEach((item) => {
        // 文件或者目录的绝对路径
        const component = join(path, item);
        if (isProcessFile(component)) {
            const { descriptor } = parse(readFileSync(component, 'utf-8'));
            const routeMetaBlock = descriptor.customBlocks.find(
                b => b.type === 'config'
            );
            const ext = extname(item);
            const fileName = basename(item, ext);
            // 路由的path
            const routePath = getRoutePath(parentRoutePath, fileName);
            // 路由名称
            const routeName = getRouteName(parentRoutePath, fileName);
            const componentPath = getComponentPath(parentRoutePath, fileName);
            if (hasLayout) {
                if (fileName === 'layout') {
                    layoutRoute.component = componentPath;
                } else {
                    layoutRoute.children.push({
                        path: routePath,
                        component: componentPath,
                        name: routeName,
                        meta: routeMetaBlock.content ? JSON.parse(routeMetaBlock.content) : {}
                    });
                }
            } else {
                parentRoutes.push({
                    path: routePath,
                    component: componentPath,
                    name: routeName,
                    meta: routeMetaBlock.content ? JSON.parse(routeMetaBlock.content) : {}
                });
            }
        }
    });

    dirList.forEach((item) => {
        if (isProcessDirectory(path, item)) {
            // 文件或者目录的绝对路径
            const component = join(path, item);
            const nextParentRouteUrl = posix.join(parentRoutePath, item);
            if (hasLayout) {
                genRoutes(layoutRoute.children, component, nextParentRouteUrl);
            } else {
                genRoutes(parentRoutes, component, nextParentRouteUrl);
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
const fix = function (routes) {
    routes.forEach((item) => {
        const path = item.path;
        let arr = path.split('/');
        if (arr[0] === '') {
            arr = arr.slice(1);
        }
        let count = 0;
        arr.forEach((sonPath) => {
            count += 4;
            if (sonPath.indexOf(':') !== -1) {
                count += 2;
            } else if (sonPath.indexOf('*') !== -1) {
                count -= 1;
            } else if (sonPath === '') {
                count += 1;
            } else {
                count += 3;
            }
        });
        item.count = count;
        if (item.children && item.children.length) {
            fix(item.children);
        }
    });
    routes = routes.sort((a, b) => b.count - a.count);
};

const getRoutes = function ({ config, absPagesPath }) {
    // 用户配置了routes则使用用户配置的
    if (config.routes) return config.routes;

    const routes = [];
    genRoutes(routes, absPagesPath, '/');
    fix(routes);
    return routes;
};

const getRoutesJSON = function ({ routes, config }) {
    // 因为要往 routes 里加无用的信息，所以必须 deep clone 一下，避免污染
    const clonedRoutes = lodash.cloneDeep(routes);

    function isFunctionComponent(component) {
        // eslint-disable-next-line
        return (
            /^\((.+)?\)(\s+)?=>/.test(component)
            || /^function([^(]+)?\(([^)]+)?\)([^{]+)?{/.test(component)
        );
    }

    function replacer(key, value) {
        switch (key) {
            case 'component':
                if (isFunctionComponent(value)) return value;
                if (config.dynamicImport) {
                    // TODO 针对目录进行 chunk 划分，import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
                    return `() => import('${value}')`;
                }
                return `require('${value}').default`;
            default:
                return value;
        }
    }

    return JSON.stringify(clonedRoutes, replacer, 2)
        .replace(
            /"component": ("(.+?)")/g,
            (global, m1, m2) => `"component": ${m2.replace(/\^/g, '"')}`
        )
        .replace(/\\r\\n/g, '\r\n')
        .replace(/\\n/g, '\r\n');
};

export default function (api) {
    api.describe({
        key: 'routes'
    });

    api.registerMethod({
        name: 'getRoutes',
        async fn() {
            return api.applyPlugins({
                key: 'modifyRoutes',
                type: api.ApplyPluginsType.modify,
                initialValue: getRoutes({
                    config: api.config,
                    absPagesPath: api.paths.absPagesPath
                })
            });
        }
    });

    api.registerMethod({
        name: 'getRoutesJSON',
        async fn() {
            const routes = await api.getRoutes();
            return getRoutesJSON({ routes, config: api.config });
        }
    });

    const {
        utils: { Mustache }
    } = api;

    const namespace = 'core/routes';

    const absCoreFilePath = join(namespace, 'routes.js');

    const absRuntimeFilePath = join(namespace, 'runtime.js');

    api.onGenerateFiles(async () => {
        const routesTpl = readFileSync(join(__dirname, 'template/routes.tpl'), 'utf-8');
        const routes = await api.getRoutesJSON();
        api.writeTmpFile({
            path: absCoreFilePath,
            content: Mustache.render(routesTpl, {
                runtimePath,
                routes,
                config: api.config
            })
        });

        api.writeTmpFile({
            path: absRuntimeFilePath,
            content: readFileSync(join(__dirname, 'template/runtime.tpl'), 'utf-8')
        });
    });

    api.addRuntimePlugin(() => `@@/${absRuntimeFilePath}`);
}
