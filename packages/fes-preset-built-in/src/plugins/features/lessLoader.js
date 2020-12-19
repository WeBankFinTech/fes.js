
export default (api) => {
    api.describe({
        key: 'lessLoader',
        config: {
            schema(joi) {
                return joi.object();
            }
        }
    });
};
