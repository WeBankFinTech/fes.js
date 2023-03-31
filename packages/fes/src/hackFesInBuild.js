// my-module/register.js
import { addHook } from 'pirates';

function matcher(filename) {
    if (filename.endsWith('/fes/lib/index.js')) return true;
    return false;
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
