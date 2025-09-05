import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,
    shims: true,
    format: ['esm'],
});
