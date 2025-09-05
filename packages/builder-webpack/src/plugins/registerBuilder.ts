import type { IPluginAPI } from '@fesjs/shared';

export default function (api: IPluginAPI) {
    api.registerBuilder({
        name: 'webpack',
    });
}
