import { copySync } from 'fs-extra/esm';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    onSuccess() {
        copySync('src/runtime', 'dist/runtime');
    },
});
