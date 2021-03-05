import { dirname } from 'path';
import { Service as CoreService } from '@fesjs/compiler';

class Service extends CoreService {
    constructor(opts) {
        process.env.FES_VERSION = require('../package').version;
        process.env.FES_DIR = dirname(require.resolve('../package'));

        super({
            ...opts,
            presets: [
                require.resolve('@fesjs/preset-built-in'),
                ...(opts.presets || [])
            ],
            plugins: [...(opts.plugins || [])]
        });
    }
}

export { Service };
