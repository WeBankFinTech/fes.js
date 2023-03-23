
export default (api) => {
    api.describe({
        key: 'useExtraCSS',
        config: {
            schema(joi) {
                return joi.boolean();
            },
            default: true
        }
    });
};
