export default (api) => {
    api.describe({
        key: 'singular',
        config: {
            default: true,
            schema(joi) {
                return joi
                    .boolean();
            }
        }
    });
};
