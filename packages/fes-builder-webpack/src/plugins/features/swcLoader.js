export default (api) => {
    api.describe({
        key: 'swcLoader',
        config: {
            schema(joi) {
                return joi.object().description('more swc options see https://github.com/swc-project/swc-loader');
            },
        },
    });
};
