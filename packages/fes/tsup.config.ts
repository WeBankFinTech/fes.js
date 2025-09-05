import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/cli.ts', 'src/forkedDev.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    outExtension: () => ({ js: '.mjs' }),
    onSuccess: 'cp public/* dist/',
    format: ['esm'],
});
