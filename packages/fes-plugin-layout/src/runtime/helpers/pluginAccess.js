import { computed, ref } from 'vue';
// eslint-disable-next-line
import { useAccess } from '../../plugin-access/core';

if (!useAccess) {
    throw new Error(
        '[plugin-layout]: pLugin-layout depends on plugin-access，please install plugin-access first！'
    );
}

export const hasAccessByMenuItem = (item) => {
    const hasChild = item.children && item.children.length;
    if (item.path && !hasChild) {
        return useAccess(item.path);
    }
    if (hasChild) {
        return computed(() => item.children.some((child) => {
            const rst = hasAccessByMenuItem(child);
            return rst && rst.value;
        }));
    }
    return ref(true);
};

export const transform = menus => menus.map((menu) => {
    const hasAccess = hasAccessByMenuItem(menu);
    if (!hasAccess.value) {
        return false;
    }
    if (menu.children) {
        menu.children = transform(menu.children);
    }
    return menu;
}).filter(Boolean);
