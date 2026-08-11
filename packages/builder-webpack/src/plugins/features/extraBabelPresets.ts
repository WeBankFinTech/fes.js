import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'extraBabelPresets',
        config: {
            schema(joi) {
                return joi.array();
            },
        },
    });
};
