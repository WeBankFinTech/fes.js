export default function (api) {
    ['modifyBundleConfig'].forEach((name) => {
        api.registerMethod({ name });
    });
}
