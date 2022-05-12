export default (api) => {
    api.describe({
        key: 'extraBabelPresets',
        config: {
            schema(joi) {
                return joi.array();
            },
        },
    });
};
