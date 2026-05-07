import { join } from 'node:path';
import { OWNER_DIR, ViteBuildConfig } from './shared';

interface BuilderPlugin {
    plugins: string[];
}

export { ViteBuildConfig };

export default function (): BuilderPlugin {
    return {
        plugins: [
            join(OWNER_DIR, 'dist/registerBuilder.mjs'),
            join(OWNER_DIR, 'dist/registerMethods.mjs'),
            join(OWNER_DIR, 'dist/registerType.mjs'),

            // bundle configs
            join(OWNER_DIR, 'dist/features/viteHtml.mjs'),
            join(OWNER_DIR, 'dist/features/viteOption.mjs'),
            join(OWNER_DIR, 'dist/features/viteVueJsx.mjs'),
            join(OWNER_DIR, 'dist/features/viteVuePlugin.mjs'),
            join(OWNER_DIR, 'dist/features/versionEmit.mjs'),
            join(OWNER_DIR, 'dist/features/viteAnalyze.mjs'),
            join(OWNER_DIR, 'dist/features/viteLegacy.mjs'),

            // commands
            join(OWNER_DIR, 'dist/commands/build/index.mjs'),
            join(OWNER_DIR, 'dist/commands/dev/index.mjs'),
        ],
    };
}
