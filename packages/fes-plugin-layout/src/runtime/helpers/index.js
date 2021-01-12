export const noop = () => {};

const matchName = (config, name) => {
    let res;
    if (Array.isArray(config)) {
        for (let i = 0; i < config.length; i++) {
            const item = config[i];
            if (item.meta && item.meta.name === name) {
                res = item.meta;
                res.path = item.path;
                break;
            }
            if (item.children && item.children.length > 0) {
                res = matchName(item.children, name);
                if (res) {
                    break;
                }
            }
        }
    }
    return res;
};

const matchPath = (config, path) => {
    let res = {};
    if (Array.isArray(config)) {
        for (let i = 0; i < config.length; i++) {
            const item = config[i];
            if (item.path && item.path === path) {
                res = item.meta;
                res.path = item.path;
                break;
            }
            if (item.children && item.children.length > 0) {
                res = matchPath(item.children, path);
                if (res) {
                    break;
                }
            }
        }
    }
    return res;
};

export const fillMenuData = (menuConfig, routeConfig, dep = 0) => {
    dep += 1;
    if (dep > 3) {
        throw new Error('[plugin-layout]: menu层级不能超出三层！');
    }
    const arr = [];
    if (Array.isArray(menuConfig) && Array.isArray(routeConfig)) {
        menuConfig.forEach((item) => {
            if (item.path !== undefined && item.path !== null) {
                Object.assign(item, matchPath(routeConfig, item.path));
            } else {
                Object.assign(item, matchName(routeConfig, item.name));
            }
            if (item.children && item.children.length > 0) {
                item.children = fillMenuData(item.children, routeConfig, dep);
            }
            arr.push(item);
        });
    }
    return arr;
};
