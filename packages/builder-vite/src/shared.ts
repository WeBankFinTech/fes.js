import type { Options as PolyfillOptions } from '@vitejs/plugin-legacy';
import type { Options } from '@vitejs/plugin-vue';
import type createPlugin from '@vitejs/plugin-vue-jsx';
import type { HTMLOptions, UserConfig } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const OWNER_DIR: string = join(dirname(fileURLToPath(import.meta.url)), '..');

export interface ViteBuildConfig {
    viteOption?: UserConfig;
    vite?: UserConfig;
    viteVuePlugin?: Options;
    viteVueJsx?: Parameters<typeof createPlugin>[0];
    viteLegacy?: PolyfillOptions;
    viteHtml?: HTMLOptions;
    viteAnalyze?: any;
    viteOptionConfig?: UserConfig;
}
