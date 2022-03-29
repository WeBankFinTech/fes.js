export default function (api) {
    [
        'addHTMLHeadScripts',
        'addMiddlewares',
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
