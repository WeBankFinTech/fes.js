export default (api) => {
    api.describe({
        key: 'inlineLimit',
        config: {
            schema(joi) {
                return joi.number();
            },
        },
    });
};
