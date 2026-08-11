import type { ServiceWithBuiltInOptions } from './types';
import { join } from 'node:path';
import process from 'node:process';
import { Service as CoreService } from '@fesjs/compiler';
import { resolve } from '@fesjs/utils';
import { readJSONSync } from 'fs-extra/esm';
import { OWNER_DIR } from './utils/shared';

class Service extends CoreService {
    constructor(opts: ServiceWithBuiltInOptions) {
        const pkg = readJSONSync(join(OWNER_DIR, 'package.json'));
        process.env.FES_VERSION = pkg.version;
        process.env.FES_DIR = OWNER_DIR;

        super({
            ...opts,
            presets: [resolve.sync('@fesjs/preset-built-in', {
                basedir: OWNER_DIR,
            }), ...(opts.presets || [])],
            plugins: [...(opts.plugins || [])],
        });
    }
}

export { Service };
