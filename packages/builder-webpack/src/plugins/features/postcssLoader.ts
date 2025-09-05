import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'postcssLoader',
        config: {
            schema(joi) {
                return joi.object();
            },
        },
    });
};
