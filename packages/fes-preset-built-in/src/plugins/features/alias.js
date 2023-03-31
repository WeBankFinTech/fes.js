export default (api) => {
    api.describe({
        key: 'alias',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
    });
};
