export default (api) => {
    api.describe({
        key: 'singular',
        config: {
            default: false,
            schema(joi) {
                return joi
                    .boolean();
            }
        }
    });
};
