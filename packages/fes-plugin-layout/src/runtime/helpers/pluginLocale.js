import { plugin } from '@@/core/coreExports';

export const transTitle = (name) => {
    if (!/^\$\S+$/.test(name)) {
        return name;
    }
    const sharedLocale = plugin.getShared('locale');
    if (sharedLocale) {
        const { t } = sharedLocale.useI18n();
        return t(name.slice(1));
    }
    return name;
};


export const transform = menus => menus.map((menu) => {
    const copy = {
        ...menu,
        label: transTitle(menu.label)
    };
    if (menu.children) {
        copy.children = transform(menu.children);
    }
    return copy;
});
