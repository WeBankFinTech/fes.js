import { dirname } from 'path';
import CoreService from './Service/Service';
import innerPlugins from './plugins';

// TODO 迁移到 fes 目录
class ServiceWithBuiltIn extends CoreService {
    constructor(opts) {
        process.env.FES_VERSION = require('../package').version;
        process.env.FES_DIR = dirname(require.resolve('../package'));

        super({
            ...opts,
            plugins: [...innerPlugins, ...(opts.plugins || [])]
        });
    }
}

export default ServiceWithBuiltIn;
