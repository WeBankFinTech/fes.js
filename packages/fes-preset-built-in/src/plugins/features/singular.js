export default (api) => {
    api.describe({
        key: 'singular',
        config: {
            default: {},
            schema(joi) {
                return joi
                    .boolean();
            }
        }
    });
};
