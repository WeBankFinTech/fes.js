import { unref, computed } from 'vue';
// eslint-disable-next-line
import { useAccess } from '../../plugin-access/core';

if (!useAccess) {
    throw new Error(
        '[plugin-layout]: pLugin-layout depends on plugin-access，please install plugin-access first！'
    );
}

export const hasAccessByMenuItem = (item) => {
    let res;
    if (item.path && (!item.children || item.children.length === 0)) {
        res = useAccess(item.path);
    } else if (item.children && item.children.length > 0) {
        res = computed(() => item.children.some((child) => {
            const rst = hasAccessByMenuItem(child);
            return rst && rst.value;
        }));
    }
    return res;
};

const _addAccessTag = (arr) => {
    if (Array.isArray(arr)) {
        arr.forEach((item) => {
            item.access = hasAccessByMenuItem(item);
            if (item.children && item.children.length > 0) {
                _addAccessTag(item.children);
            }
        });
    }
};

export const transform = (menus) => {
    const originData = unref(menus);
    _addAccessTag(originData);

    return originData;
};
