export default (api) => {
    api.describe({
        key: 'devtool',
        config: {
            schema(joi) {
                return joi.string();
            },
        },
    });
};
