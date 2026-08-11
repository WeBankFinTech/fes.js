import { deepmerge } from '@fesjs/utils';
import { isPlainObject } from 'es-toolkit/compat';

interface MergeDefaultOptions {
    defaultConfig: any;
    config: any;
}

export default function mergeDefault({ defaultConfig, config }: MergeDefaultOptions): any {
    if (isPlainObject(defaultConfig) && isPlainObject(config)) {
        return deepmerge(defaultConfig, config);
    }
    return typeof config !== 'undefined' ? config : defaultConfig;
}
