import { copySync } from 'fs-extra/esm';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/cli.ts', 'src/forkedDev.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    onSuccess() {
        copySync('public', 'dist');
    },
    format: ['esm'],
});
