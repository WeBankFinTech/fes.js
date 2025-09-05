import type { IPluginAPI } from '@fesjs/shared';

export default function (api: IPluginAPI) {
    [
        'addHTMLHeadScripts',
        'modifyBundleConfigOpts',
        'modifyBundleConfig',
        'modifyBabelOpts',
        'modifyBabelPresetOpts',
        'chainWebpack',
        'modifyPublicPathStr',
    ].forEach((name) => {
        api.registerMethod({ name });
    });
}
