import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'html',
        config: {
            schema(joi) {
                return joi.object().description('more html-webpack-plugin options see https://github.com/jantimon/html-webpack-plugin#configuration');
            },
            default: {},
        },
    });
};
