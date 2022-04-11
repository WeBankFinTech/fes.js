const getMetaByName = (config, name) => {
    let res = {};
    if (Array.isArray(config)) {
        for (let i = 0; i < config.length; i++) {
            const item = config[i];
            if (item.meta && item.meta.name === name) {
                res = item.meta;
                res.path = item.path;
                break;
            }
            if (item.children && item.children.length > 0) {
                res = getMetaByName(item.children, name);
                if (res.path) {
                    break;
                }
            }
        }
    }
    return res;
};

const fillMenuByRoute = (menuConfig, routeConfig, dep = 0) => {
    dep += 1;
    if (dep > 3) {
        console.warn('[plugin-layout]: 菜单层级最好不要超出三层！');
    }
    const arr = [];
    if (Array.isArray(menuConfig) && Array.isArray(routeConfig)) {
        menuConfig.forEach((menu) => {
            const pageConfig = {};
            if (menu.name) {
                Object.assign(
                    pageConfig,
                    getMetaByName(routeConfig, menu.name)
                );
            }
            // menu的配置优先级高，当menu存在配置时，忽略页面的配置
            Object.keys(pageConfig).forEach((prop) => {
                if (
                    menu[prop] === undefined
                    || menu[prop] === null
                    || menu[prop] === ''
                ) {
                    menu[prop] = pageConfig[prop];
                }
            });
            if (menu.children && menu.children.length > 0) {
                menu.children = fillMenuByRoute(
                    menu.children,
                    routeConfig,
                    dep
                );
            }
            arr.push(menu);
        });
    }
    return arr;
};

export default fillMenuByRoute;
