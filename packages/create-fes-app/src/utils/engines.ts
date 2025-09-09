import process from 'node:process';

import { logger } from './logger';

export async function checkEngines() {
    const satisfies = await import('semver/functions/satisfies.js').then(
        r => r.default || (r as any as typeof import('semver/functions/satisfies.js')),
    ); // npm/node-semver#381
    const currentNode = process.versions.node;
    const nodeRange = '>= 18.0.0';

    if (!satisfies(currentNode, nodeRange)) {
        logger.warn(
            `Current version of Node.js (\`${currentNode}\`) is unsupported and might cause issues.\n       Please upgrade to a compatible version \`${nodeRange}\`.`,
        );
    }
}
