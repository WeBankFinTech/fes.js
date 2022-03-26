import { join } from 'path';
import { existsSync } from 'fs';
import { winPath } from '@fesjs/utils';

export function getAppPath(absSrcPath) {
    for (const suffix of ['.js', '.ts', '.jsm', '.jsx', '.tsx']) {
        const p = winPath(join(absSrcPath, `app${suffix}`));
        if (existsSync(p)) {
            return p;
        }
    }
    return null;
}
