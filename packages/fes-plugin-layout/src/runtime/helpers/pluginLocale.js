import { unref, computed } from 'vue';
import { plugin } from '@@/core/coreExports';


export const transTitle = (name) => {
    const sharedLocale = plugin.getShared('locale');
    if (sharedLocale) {
        const { t } = sharedLocale.useI18n();
        return t(name);
    }
    return name;
};


const _transform = (arr) => {
    if (Array.isArray(arr)) {
        arr.forEach((item) => {
            if (item.title) {
                item._title = item.title;
                item.title = computed(() => transTitle(item._title));
            }
            if (item.children && item.children.length > 0) {
                _transform(item.children);
            }
        });
    }
};

export const transform = (menus) => {
    const originData = unref(menus);
    _transform(originData);
    return originData;
};
