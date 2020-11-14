
export default (api) => {
    api.describe({
        key: 'base',
        config: {
            default: '/',
            schema(joi) {
                return joi.string();
            }
        }
    });
};
