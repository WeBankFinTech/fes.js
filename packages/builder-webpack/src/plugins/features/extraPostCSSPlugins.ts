import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'extraPostCSSPlugins',
        config: {
            schema(joi) {
                return joi.array();
            },
        },
    });
};
