

export default (api) => {
    api.describe({
        key: 'vueLoader',
        config: {
            schema(joi) {
                return joi
                    .object({})
                    .description(
                        'more vue-loader options see https://vue-loader.vuejs.org/'
                    );
            }
        }
    });
};
