
export default (api) => {
    api.describe({
        key: 'hash',
        config: {
            default: true,
            schema(joi) {
                return joi.boolean();
            }
        }
    });
};
