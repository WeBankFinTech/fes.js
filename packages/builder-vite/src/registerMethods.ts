import type { IPluginAPI } from '@fesjs/shared';

export default function (api: IPluginAPI) {
    ['modifyBundleConfig'].forEach((name) => {
        api.registerMethod({ name });
    });
}
