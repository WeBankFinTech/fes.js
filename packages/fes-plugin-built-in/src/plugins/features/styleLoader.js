export default (api) => {
    api.describe({
        key: 'styleLoader',
        config: {
            schema(joi) {
                return joi.object();
            }
        }
    });
};
