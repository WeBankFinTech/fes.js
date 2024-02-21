// my-module/register.js
import { join } from 'node:path';
import { addHook } from 'pirates';

function matcher(filename) {
    return filename.endsWith(join(...['fes', 'lib', 'index.js']));
}

export function hackFesInBuild() {
    addHook(
        () => `
    module.exports = {
        defineBuildConfig(params) {
            return params;
        }
    }
`,
        { exts: ['.js'], ignoreNodeModules: false, matcher },
    );
}
