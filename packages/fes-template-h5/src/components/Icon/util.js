export function normalizeAttrs(attrs = {}) {
    return Object.keys(attrs).reduce((acc, key) => {
        const val = attrs[key];
        switch (key) {
            case 'class':
                acc.className = val;
                delete acc.class;
                break;
            default:
                acc[key] = val;
        }
        return acc;
    }, {});
}

export function generate(h, node, key, rootProps) {
    if (!rootProps) {
        return h(
            node.tag,
            { key, attrs: { ...normalizeAttrs(node.attrs) } },
            (node.children || []).map((child, index) => generate(h, child, `${key}-${node.tag}-${index}`))
        );
    }
    return h(
        node.tag,
        {
            key,
            ...rootProps,
            attrs: { ...normalizeAttrs(node.attrs), ...rootProps.attrs }
        },
        (node.children || []).map((child, index) => generate(h, child, `${key}-${node.tag}-${index}`))
    );
}
