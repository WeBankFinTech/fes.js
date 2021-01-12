import { unref, computed } from 'vue';
import { useAccess } from '@webank/fes';

if (!useAccess) {
    throw new Error(
        '[plugin-layout]: pLugin-layout依赖plugin-access，请先安装plugin-access！'
    );
}

const hasAccess = (item) => {
    let res;
    if (item.path && (!item.children || item.children.length === 0)) {
        res = useAccess(item.path);
    } else if (item.children && item.children.length > 0) {
        res = computed(() => item.children.some(child => hasAccess(child)));
    }
    return res;
};

const addAcessTag = (arr) => {
    if (Array.isArray(arr)) {
        arr.forEach((item) => {
            item.access = hasAccess(item);
            if (item.children && item.children.length > 0) {
                addAcessTag(item.children);
            }
        });
    }
};

export default function (menus) {
    const originData = unref(menus);
    addAcessTag(originData);
    return originData;
}
