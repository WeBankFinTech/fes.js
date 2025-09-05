import type { IPluginAPI } from '@fesjs/shared';
import process from 'node:process';

export default (api: IPluginAPI) => {
    api.describe({
        key: 'viteLegacy',
        config: {
            schema(joi: any) {
                return joi.object();
            },
            default: {},
        },
        enableBy: () => !!process.env.ANALYZE,
    });
};
