
const matchName = (config, name) => {
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
                res = matchName(item.children, name);
            }
        }
    }
    return res;
};

export const fillMenuByRoute = (menuConfig, routeConfig, dep = 0) => {
    dep += 1;
    if (dep > 3) {
        console.warn('[plugin-layout]: 菜单层级最好不要超出三层！');
    }
    const arr = [];
    if (Array.isArray(menuConfig) && Array.isArray(routeConfig)) {
        menuConfig.forEach((menu) => {
            const pageConfig = {};
            if (menu.name) {
                Object.assign(pageConfig, matchName(routeConfig, menu.name));
            }
            // menu的配置优先级高，当menu存在配置时，忽略页面的配置
            Object.keys(pageConfig).forEach((prop) => {
                if (menu[prop] === undefined || menu[prop] === null || menu[prop] === '') {
                    menu[prop] = pageConfig[prop];
                }
            });
            // 处理icon
            if (menu.icon) {
                const icon = menu.icon;
                const urlReg = /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                if (typeof icon === 'string' && !((urlReg.test(icon) || icon.includes('.svg')))) {
                    menu.icon = {
                        type: 'icon',
                        name: icon
                    };
                }
            }
            if (menu.children && menu.children.length > 0) {
                menu.children = fillMenuByRoute(menu.children, routeConfig, dep);
            }
            arr.push(menu);
        });
    }
    return arr;
};

export function getIconsFromMenu(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    let icons = [];
    data.forEach((item = { path: '/' }) => {
        if (item.icon) {
            const { icon } = item;
            if (icon.type === 'icon') {
                icons.push(icon.name);
            }
        }
        if (item.children) {
            icons = icons.concat(getIconsFromMenu(item.children));
        }
    });

    return Array.from(new Set(icons));
}
