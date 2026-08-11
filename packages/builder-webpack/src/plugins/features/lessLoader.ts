import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'lessLoader',
        config: {
            default: {},
            schema(joi) {
                return joi.object();
            },
        },
    });
};
