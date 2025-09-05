import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'chainWebpack',
        config: {
            schema(joi) {
                return joi.function();
            },
        },
    });
};
