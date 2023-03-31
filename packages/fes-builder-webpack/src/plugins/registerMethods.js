export default function (api) {
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
