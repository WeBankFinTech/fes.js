
export default (api) => {
    api.describe({
    // https://cssnano.co/optimisations/
        key: 'cssnano',
        config: {
            default: {
                mergeRules: false,
                minifyFontValues: { removeQuotes: false }
            },
            schema(joi) {
                return joi.object();
            }
        }
    });
};
