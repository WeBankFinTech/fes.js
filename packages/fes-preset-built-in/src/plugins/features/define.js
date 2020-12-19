
export default (api) => {
    api.describe({
        key: 'define',
        config: {
            schema(joi) {
                return joi.object();
            }
        }
    });
};
