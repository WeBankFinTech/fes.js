import type { IPluginAPI } from '@fesjs/shared';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'externals',
        config: {
            schema(joi) {
                // https://webpack.js.org/configuration/externals/#externals
                return joi.alternatives(joi.object(), joi.string(), joi.function());
            },
        },
    });
};
