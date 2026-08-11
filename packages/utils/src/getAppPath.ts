import { existsSync } from 'node:fs';
import { join } from 'node:path';
import winPath from './winPath';

export default function getAppPath(absSrcPath: string): string | null {
    for (const suffix of ['.js', '.ts', '.jsm', '.jsx', '.tsx']) {
        const p = winPath(join(absSrcPath, `app${suffix}`));
        if (existsSync(p)) {
            return p;
        }
    }
    return null;
}
