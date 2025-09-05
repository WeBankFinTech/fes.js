import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/registerBuilder.ts',
        'src/registerMethods.ts',
        'src/registerType.ts',
        'src/features/viteHtml.ts',
        'src/features/viteOption.ts',
        'src/features/viteVueJsx.ts',
        'src/features/viteVuePlugin.ts',
        'src/features/viteAnalyze.ts',
        'src/features/viteLegacy.ts',
        'src/commands/build/index.ts',
        'src/commands/dev/index.ts',
    ],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,
    shims: true,
    format: ['esm'],
});
