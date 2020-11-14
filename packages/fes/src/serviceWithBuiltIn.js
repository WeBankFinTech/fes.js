import { dirname } from 'path';
import { Service as CoreService } from '@webank/fes-core';
import innerPlugins from '@webank/fes-plugin-built-in';

class Service extends CoreService {
    constructor(opts) {
        process.env.FES_VERSION = require('../package').version;
        process.env.FES_DIR = dirname(require.resolve('../package'));
        process.env.UMI_DIR = dirname(require.resolve('../package'));

        super({
            ...opts,
            plugins: [...innerPlugins, ...(opts.plugins || [])]
        });
    }
}

export { Service };
