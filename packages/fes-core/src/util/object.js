export function merge(...args) {
    const base = args[0];
    if (!base) return null;
    [].forEach.call(args, (item, index) => {
        if (index > 0) {
            Object.keys(item).forEach((attrname) => {
                base[attrname] = item[attrname];
            });
        }
    });
    return base;
}

export function extend(...args) {
    const base = args[0];
    if (!base) return null;
    [].forEach.call(args, (item, index) => {
        if (index > 0) {
            Object.keys(item).forEach((attrname) => {
                if (base[attrname] !== undefined) {
                    base[attrname] = item[attrname];
                }
            });
        }
    });
    return base;
}
