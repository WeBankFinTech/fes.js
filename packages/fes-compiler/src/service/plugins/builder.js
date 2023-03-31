export default (api) => {
    api.describe({
        key: 'builder',
        config: {
            schema(joi) {
                return joi.string();
            },
            default: '',
        },
    });
};
