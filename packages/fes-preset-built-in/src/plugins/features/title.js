export default (api) => {
    api.describe({
        key: 'title',
        config: {
            schema(joi) {
                return joi.string();
            },
        },
    });
};
