
export default (api) => {
    api.describe({
        key: 'chunks',
        config: {
            schema(joi) {
                return joi.array().items(joi.string());
            }
        }
    });
};
