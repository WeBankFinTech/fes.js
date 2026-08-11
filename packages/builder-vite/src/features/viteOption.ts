import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'viteOption',
        config: {
            schema(joi: any) {
                return joi.object();
            },
            default: {},
        },
    });
    api.describe({
        key: 'vite',
        config: {
            schema(joi: any) {
                return joi.object();
            },
            default: {},
        },
    });
};
