import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'copy',
        config: {
            schema(joi) {
                return joi.array().items(
                    joi.alternatives(
                        joi.object({
                            from: joi.string(),
                            to: joi.string(),
                        }),
                        joi.string(),
                    ),
                );
            },
        },
    });
};
