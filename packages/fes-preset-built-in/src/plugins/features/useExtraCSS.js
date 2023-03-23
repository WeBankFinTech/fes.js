
export default (api) => {
    api.describe({
        key: 'useExtraCss',
        config: {
            schema(joi) {
                return joi.boolean();
            }
        },
        default: true
    });
};
