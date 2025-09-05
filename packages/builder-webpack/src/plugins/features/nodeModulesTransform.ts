import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'nodeModulesTransform',
        config: {
            default: {
                exclude: [],
            },
            schema(joi) {
                return joi.object({
                    exclude: joi.array().items(joi.string()),
                });
            },
        },
    });
};
