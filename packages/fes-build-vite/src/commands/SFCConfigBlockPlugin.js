export default {
    name: 'sfc-config',
    transform(code, id) {
        if (/vue&type=config/.test(id)) {
            return `export default ''`;
        }
    },
};
