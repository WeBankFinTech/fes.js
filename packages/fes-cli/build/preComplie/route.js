//   pages
//  ├── index.vue         # 根路由页面 路径 /
//  ├── *.vue             # 模糊匹配 路径 *
//  ├── a.vue             # 路径 /a
//  ├── b
//  │   ├── index.vue     # 路径 /b
//  │   ├── @id.vue       # 动态路由 /b/:id
//  │   └── c.vue         # 路径 /b/c
//  └── layout.vue        # 根路由下所有page共用的外层

const fs = require('fs');
const Path = require('path');


const isProcessFile = function (path) {
    const ext = Path.extname(path);
    return fs.statSync(path).isFile() && ['.fes', '.vue'].includes(ext);
};

const isProcessDirectory = function (path, item) {
    const component = Path.posix.join(path, item);
    return fs.statSync(component).isDirectory() && !['components'].includes(item);
};

const checkHasLayout = function (path) {
    const dirList = fs.readdirSync(path);
    return dirList.some((item) => {
        if (!isProcessFile(Path.posix.join(path, item))) {
            return false;
        }
        const ext = Path.extname(item);
        const fileName = Path.basename(item, ext);
        return fileName === 'layout';
    });
};

const getRouteName = function (parentRoutePath, fileName) {
    const routeName = Path.posix.join(parentRoutePath, fileName);
    return routeName.slice(1).replace(/\//g, '_').replace(/@/g, '_').replace(/\*/g, 'FUZZYMATCH');
};

const getRoutePath = function (parentRoutePath, fileName) {
    // /index.vue -> /
    if (fileName === 'index') {
        fileName = '';
    }
    let routePath = Path.posix.join(parentRoutePath, fileName);
    // /@id.vue -> /:id
    routePath = routePath.replace(/@/g, ':');
    // /*.vue -> *
    if (routePath === '/*') {
        routePath = '*';
    }
    return routePath;
};

const build = function (components, parentRoutes, path, parentRoutePath) {
    const dirList = fs.readdirSync(path);
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
        const component = Path.posix.join(path, item);
        if (isProcessFile(component)) {
            const ext = Path.extname(item);
            const fileName = Path.basename(item, ext);
            // 路由的path
            const routePath = getRoutePath(parentRoutePath, fileName);
            // 路由名称
            const routeName = getRouteName(parentRoutePath, fileName);
            components.push({
                name: routeName,
                path: component
            });
            if (hasLayout) {
                if (fileName === 'layout') {
                    layoutRoute.component = routeName;
                } else {
                    layoutRoute.children.push({
                        path: routePath,
                        component: routeName,
                        name: routeName
                    });
                }
            } else {
                parentRoutes.push({
                    path: routePath,
                    component: routeName,
                    name: routeName
                });
            }
        }
    });

    dirList.forEach((item) => {
        if (isProcessDirectory(path, item)) {
            // 文件或者目录的绝对路径
            const component = Path.posix.join(path, item);
            const nextParentRouteUrl = Path.posix.join(parentRoutePath, item);
            if (hasLayout) {
                build(components, layoutRoute.children, component, nextParentRouteUrl);
            } else {
                build(components, parentRoutes, component, nextParentRouteUrl);
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
        // console.log(arr);
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

module.exports = function (pageDir) {
    const components = [];
    const routes = [];
    build(components, routes, pageDir, '/');
    fix(routes);
    return {
        components,
        routes
    };
};
