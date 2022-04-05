/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/blob/master/packages/umi/src/ServiceWithBuiltIn.ts
 */

import { dirname } from 'path';
import { Service as CoreService } from '@fesjs/compiler';

class Service extends CoreService {
    constructor(opts) {
        process.env.FES_VERSION = require('../package.json').version;
        process.env.FES_DIR = dirname(require.resolve('../package'));

        super({
            ...opts,
            presets: [require.resolve('@fesjs/preset-built-in'), ...(opts.presets || [])],
            plugins: [...(opts.plugins || [])],
        });
    }
}

export { Service };
