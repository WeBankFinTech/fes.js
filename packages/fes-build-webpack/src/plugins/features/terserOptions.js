export default (api) => {
    api.describe({
        key: 'terserOptions',
        config: {
            schema(joi) {
                return joi.object();
            },
        },
    });
};
