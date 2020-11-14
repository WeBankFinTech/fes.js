
export default (api) => {
    api.describe({
        key: 'theme',
        config: {
            schema(joi) {
                return joi.object().pattern(joi.string(), joi.string());
            }
        }
    });
};
