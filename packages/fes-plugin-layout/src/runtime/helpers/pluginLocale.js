import { plugin } from '@@/core/coreExports';

export function transTitle(name) {
    if (!/^\$\S+$/.test(name)) {
        return name;
    }
    const sharedLocale = plugin.getShared('locale');
    if (sharedLocale) {
        const { t } = sharedLocale.locale;
        return t(name.slice(1));
    }
    return name;
}

export function transform(menus) {
    return menus.map((menu) => {
        const copy = {
            ...menu,
            label: transTitle(menu.label),
        };
        if (menu.children) {
            copy.children = transform(menu.children);
        }
        return copy;
    });
}
