import { deepmerge, lodash } from '@fesjs/utils';

interface MergeDefaultOptions {
    defaultConfig: any;
    config: any;
}

export default function mergeDefault({ defaultConfig, config }: MergeDefaultOptions): any {
    if (lodash.isPlainObject(defaultConfig) && lodash.isPlainObject(config)) {
        return deepmerge(defaultConfig, config);
    }
    return typeof config !== 'undefined' ? config : defaultConfig;
}
