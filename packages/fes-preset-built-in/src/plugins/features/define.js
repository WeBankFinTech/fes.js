
export default (api) => {
    api.describe({
        key: 'define',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false
            }
        }
    });
};
