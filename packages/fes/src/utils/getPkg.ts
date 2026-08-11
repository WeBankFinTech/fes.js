import { join } from 'node:path';
import { readJSONSync } from 'fs-extra/esm';
import getCwd from './getCwd';

export default (dir: string): Record<string, any> | undefined => {
    try {
        return readJSONSync(join(getCwd(), 'package.json'));
    }
    catch {
        try {
            return readJSONSync(join(dir, 'package.json'));
        }
        catch {
            return undefined;
        }
    }
};
