
export default (api) => {
    api.describe({
        key: 'hash',
        config: {
            schema(joi) {
                return joi.boolean();
            }
        }
    });
};
