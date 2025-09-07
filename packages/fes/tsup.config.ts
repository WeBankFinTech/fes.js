import { copySync } from 'fs-extra/esm';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/cli.ts', 'src/forkedDev.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    outExtension: () => ({ js: '.mjs' }),
    onSuccess() {
        copySync('public', 'dist');
    },
    format: ['esm'],
});
