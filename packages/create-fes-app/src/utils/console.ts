import process from 'node:process';

import { consola } from 'consola';

export function setupGlobalConsole(opts: { dev?: boolean } = {}) {
    // Wrap all console logs with consola for better DX
    if (opts.dev) {
        consola.wrapAll();
    }
    else {
        consola.wrapConsole();
    }

    process.on('unhandledRejection', err => consola.error('[unhandledRejection]', err));

    process.on('uncaughtException', err => consola.error('[uncaughtException]', err));
}
