export const flatNodes = (nodes = []) => nodes.reduce((res, node) => {
    res.push(node);
    if (node.children) {
        res = res.concat(
            flatNodes(node.children)
        );
    }
    return res;
}, []);
