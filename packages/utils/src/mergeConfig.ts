type ConfigValue = any;
type ConfigFunction = (value: any) => any;
type ConfigObject = Record<string, ConfigValue | ConfigFunction>;

export default function mergeConfig(defaultConfig: ConfigObject, ...configs: (ConfigObject | undefined)[]): ConfigObject {
    const ret: ConfigObject = { ...defaultConfig };
    configs.forEach((config) => {
        if (!config) {
            return;
        }
        Object.keys(config).forEach((key) => {
            const val = config[key];
            if (typeof val === 'function') {
                ret[key] = (val as ConfigFunction)(ret[key]);
            }
            else {
                ret[key] = val;
            }
        });
    });
    return ret;
}
