import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'viteVuePlugin',
        config: {
            schema(joi: any) {
                return joi.object();
            },
            default: {},
        },
    });
};
