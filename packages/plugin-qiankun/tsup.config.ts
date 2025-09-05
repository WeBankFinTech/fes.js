import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/main/index.ts',
        'src/micro/index.ts',
    ],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    onSuccess: 'cp -r src/main/runtime dist/main && cp -r src/micro/runtime dist/micro',
});
