import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'devtool',
        config: {
            schema(joi) {
                return joi.string();
            },
        },
    });
};
