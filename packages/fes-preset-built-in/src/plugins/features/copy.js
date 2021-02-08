
export default (api) => {
    api.describe({
        key: 'copy',
        config: {
            schema(joi) {
                return joi.array().items(
                    joi.alternatives(
                        joi.object({
                            from: joi.string(),
                            to: joi.string()
                        }),
                        joi.string()
                    )
                );
            }
        }
    });
};
