import { createRequire } from 'node:module';

import { dirname, join } from 'node:path';

import { fileURLToPath } from 'node:url';

export function esmResolve(specifier: string) {
    const esmRequire = createRequire(import.meta.url);
    return esmRequire.resolve(specifier);
}

export const OWNER_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
