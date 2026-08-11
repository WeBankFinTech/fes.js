import { copySync } from 'fs-extra/esm';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/main/index.ts',
        'src/micro/index.ts',
        'src/vite-plugin/index.ts',
    ],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    onSuccess() {
        copySync('src/main/runtime', 'dist/main/runtime');
        copySync('src/micro/runtime', 'dist/micro/runtime');
    },
});
