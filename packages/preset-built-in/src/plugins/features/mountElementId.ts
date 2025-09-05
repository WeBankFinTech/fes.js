export default (api) => {
    api.describe({
        key: 'mountElementId',
        config: {
            default: 'app',
            schema(joi) {
                return joi.string().allow('');
            },
        },
    });
};
