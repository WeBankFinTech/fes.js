export function getIconNamesFromMenu(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    let icons = [];
    data.forEach((item) => {
        if (item.icon) {
            const { icon } = item;
            // 处理icon
            if (icon) {
                const urlReg = /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                if (typeof icon === 'string' && !(urlReg.test(icon) || icon.includes('.svg'))) {
                    icons.push(icon);
                }
            }
        }
        if (item.children) {
            icons = icons.concat(getIconNamesFromMenu(item.children));
        }
    });

    return Array.from(new Set(icons));
}
