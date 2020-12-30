import { deepmerge, lodash } from '@umijs/utils';


export default ({ defaultConfig, config }) => {
    if (lodash.isPlainObject(defaultConfig) && lodash.isPlainObject(config)) {
        return deepmerge(defaultConfig, config);
    }
    return typeof config !== 'undefined' ? config : defaultConfig;
};
