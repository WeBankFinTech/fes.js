
export default (api) => {
    api.describe({
        key: 'dynamicImport',
        config: {
            schema(joi) {
                return joi.boolean();
            }
        },
        default: false
    });
};
