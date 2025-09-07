import { defineConfig } from 'tsup';
import { copyTplFiles } from '../../scripts/shared.mjs';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/plugins/registerMethods.ts',
        'src/plugins/registerType.ts',
        'src/plugins/core/plugin/index.ts',
        'src/plugins/core/exports/coreExports.ts',
        'src/plugins/core/exports/pluginExports.ts',
        'src/plugins/core/entry/index.ts',
        'src/plugins/core/route/index.ts',
        'src/plugins/features/alias.ts',
        'src/plugins/features/autoprefixer.ts',
        'src/plugins/features/define.ts',
        'src/plugins/features/console.ts',
        'src/plugins/features/dynamicImport.ts',
        'src/plugins/features/globalCSS.ts',
        'src/plugins/features/inlineLimit.ts',
        'src/plugins/features/mountElementId.ts',
        'src/plugins/features/mock.ts',
        'src/plugins/features/outputPath.ts',
        'src/plugins/features/plugins.ts',
        'src/plugins/features/presets.ts',
        'src/plugins/features/proxy.ts',
        'src/plugins/features/publicPath.ts',
        'src/plugins/features/singular.ts',
        'src/plugins/features/targets.ts',
        'src/plugins/features/terserOptions.ts',
        'src/plugins/features/title.ts',
        'src/plugins/commands/help/index.ts',
        'src/plugins/commands/info/index.ts',
    ],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    format: ['esm'],
    onSuccess: () => {
        copyTplFiles('src', 'dist');
    },
});
