import { join } from 'path';
import getCwd from './getCwd';

export default (dir) => {
    try {
        // eslint-disable-next-line
        return require(join(getCwd(), 'package.json'));
    } catch (error) {
        try {
            // eslint-disable-next-line
            return require(join(dir, 'package.json'));
        } catch (err) {
            return null;
        }
    }
};
