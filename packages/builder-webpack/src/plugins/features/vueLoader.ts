import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'vueLoader',
        config: {
            schema(joi) {
                return joi.object({}).description('more vue-loader options see https://vue-loader.vuejs.org/');
            },
        },
    });
};
