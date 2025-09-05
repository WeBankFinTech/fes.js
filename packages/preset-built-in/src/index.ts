import { join } from 'node:path';
import { OWNER_DIR } from './shared';

export default function () {
    return {
        plugins: [
            // register methods
            join(OWNER_DIR, 'dist/plugins/registerMethods.mjs'),
            join(OWNER_DIR, 'dist/plugins/registerType.mjs'),

            // generate files
            join(OWNER_DIR, 'dist/plugins/core/plugin/index.mjs'),
            join(OWNER_DIR, 'dist/plugins/core/exports/coreExports.mjs'),
            join(OWNER_DIR, 'dist/plugins/core/exports/pluginExports.mjs'),
            join(OWNER_DIR, 'dist/plugins/core/entry/index.mjs'),
            join(OWNER_DIR, 'dist/plugins/core/route/index.mjs'),

            // bundle configs
            join(OWNER_DIR, 'dist/plugins/features/alias.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/autoprefixer.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/define.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/console.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/dynamicImport.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/globalCSS.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/inlineLimit.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/mountElementId.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/mock.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/outputPath.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/plugins.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/presets.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/proxy.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/publicPath.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/singular.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/targets.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/terserOptions.mjs'),
            join(OWNER_DIR, 'dist/plugins/features/title.mjs'),

            // commands
            join(OWNER_DIR, 'dist/plugins/commands/help/index.mjs'),
        ],
    };
}
