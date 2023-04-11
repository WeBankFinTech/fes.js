// eslint-disable-next-line
import { hasAccessSync } from '../../plugin-access/core';

if (!hasAccessSync) {
    throw new Error('[plugin-layout]: pLugin-layout depends on plugin-access，please install plugin-access first！');
}

export const hasAccessByMenuItem = (item) => {
    const hasChild = item.children && item.children.length;
    if (item.path && !hasChild) {
        return hasAccessSync(item.path);
    }
    if (hasChild) {
        return item.children.some((child) => {
            const rst = hasAccessByMenuItem(child);
            return rst;
        });
    }
    return true;
};

export const transform = (menus) =>
    menus
        .map((menu) => {
            const hasAccess = hasAccessByMenuItem(menu);
            if (!hasAccess) {
                return false;
            }
            if (menu.children) {
                menu.children = transform(menu.children);
            }
            return menu;
        })
        .filter(Boolean);
