import { plugin } from '@@/core/coreExports';

export const transTitle = (name) => {
    const sharedLocale = plugin.getShared('locale');
    if (sharedLocale) {
        const { t } = sharedLocale.useI18n();
        return t(name);
    }
    return name;
};


export const transform = menus => menus.map((menu) => {
    const copy = {
        ...menu,
        _label: menu.label,
        label: transTitle(menu.label)
    };
    if (menu.children) {
        copy.children = transform(menu.children);
    }
    return copy;
});
