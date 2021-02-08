
export default (api) => {
    api.describe({
        key: 'devScripts',
        config: {
            schema(joi) {
                return joi.object();
            }
        },
        enableBy() {
            return api.env === 'development';
        }
    });
};
