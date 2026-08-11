import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'extraCSS',
        config: {
            schema(joi) {
                return joi.object({
                    plugin: joi.object(),
                    loader: joi.object(),
                });
            },
            default: {},
        },
    });
};
