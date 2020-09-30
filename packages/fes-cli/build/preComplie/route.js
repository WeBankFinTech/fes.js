//   pages
//  ├── index.fes         # 根路由页面 路径 index.html#/
//  ├── a.fes             # 路径 /a
//  ├── b
//  │   ├── index.fes     # 路径 /b
//  │   ├── @id.fes       # 动态路由 /b/:id
//  │   └── c.fes         # 路径 /b/c
//  └── layout.fes        # 根路由下所有page共用的外层

const fs = require('fs');
const Path = require('path');

let pagesDir;
let outputPageDir;
let components = [];

function checkHasLayout(path) {
    const dirList = fs.readdirSync(path);
    let hasLayout = false;
    dirList.forEach((item) => {
        if (fs.statSync(`${path}/${item}`).isFile()
            && item[0] !== '.' && ['.vue', '.jsx'].indexOf(Path.extname(item)) !== -1
            && Path.basename(item, Path.extname(item)) === 'layout') {
            hasLayout = true;
        }
    });
    return hasLayout;
}

function routeUrlFormmter(str) {
    return str.replace(/@/g, ':');
}

function genRoute(path, prePathUrl, preRoutes) {
    const hasLayout = checkHasLayout(path);
    const dirList = fs.readdirSync(path);
    let childRoutes = {};
    const parentRoutes = {};
    const preRouteUrl = routeUrlFormmter(prePathUrl);
    if (hasLayout) {
        parentRoutes[preRouteUrl] = {
            subRoutes: childRoutes
        };
    } else {
        childRoutes = parentRoutes;
    }
    dirList.forEach((item) => {
        if (fs.statSync(`${path}/${item}`).isFile()
            && item[0] !== '.' && ['.jsx', '.vue'].indexOf(Path.extname(item)) !== -1) {
            const fileName = Path.basename(item, Path.extname(item));
            const preRouteName = path.slice(pagesDir.length + 1);
            let routePath = Path.posix.join(preRouteUrl, (fileName === 'index' ? '' : fileName.replace(/@/g, ':')));
            const filePath = Path.resolve(path.replace(pagesDir, outputPageDir), item);
            let routeName = preRouteName ? `${preRouteName}_${fileName}` : fileName;
            routeName = routeName.replace(/\//g, '_').replace(/@/g, '');
            routePath = routePath.replace(/@/g, ':');

            if (hasLayout && fileName === 'index') {
                routePath = '/';
            } else if (hasLayout && fileName !== 'index') {
                routePath = routePath.split(preRouteUrl)[1];
            }
            components.push({
                name: routeName,
                path: filePath.replace(/\\/g, '\\\\')
            });
            if (fileName === 'layout') {
                parentRoutes[preRouteUrl].component = routeName;
                return;
            }
            childRoutes[routePath] = {
                name: routeName || 'index',
                component: routeName
            };
        }
    });
    preRoutes = Object.assign(preRoutes, parentRoutes);
    const toNextRoutes = hasLayout ? childRoutes : preRoutes;

    dirList.forEach((item) => {
        if (fs.statSync(`${path}/${item}`).isDirectory()) {
            let toNextPreRouteUrl = Path.posix.join(prePathUrl, item);
            if (hasLayout) {
                toNextPreRouteUrl = Path.posix.join('/', item);
            }
            genRoute(`${path}/${item}`, toNextPreRouteUrl, toNextRoutes, outputPageDir, components);
        }
    });
}

function fixRouter2(routes, newRoutes, f) {
    Object.keys(routes).forEach((p) => {
        const item = {
            path: f ? p.slice(1) : p,
            component: routes[p].component
        };
        if (routes[p].name) {
            item.name = routes[p].name;
        }
        if (routes[p].subRoutes) {
            item.children = [];
            fixRouter2(routes[p].subRoutes, item.children, true);
        }
        newRoutes.push(item);
    });
}

module.exports = function (_pagesDir, _outputPageDir) {
    const routes = {};
    const newRoutes = [];
    components = [];
    pagesDir = _pagesDir;
    outputPageDir = _outputPageDir;
    genRoute(pagesDir, '/', routes);
    fixRouter2(routes, newRoutes);
    return {
        routes,
        newRoutes,
        components
    };
};
