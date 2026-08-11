import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/service/plugins/builder.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,
    shims: true,
    format: ['esm'],
});
