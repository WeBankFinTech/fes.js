export default function mergeConfig(defaultConfig, ...configs) {
    const ret = { ...defaultConfig };
    configs.forEach((config) => {
        if (!config) return;
        Object.keys(config).forEach((key) => {
            const val = config[key];
            if (typeof val === 'function') {
                ret[key] = val(ret[key]);
            } else {
                ret[key] = val;
            }
        });
    });
    return ret;
}
