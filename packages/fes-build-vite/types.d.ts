import type {UserConfig} from 'vite';
import type {Options} from '@vitejs/plugin-vue'
import {Options as PolyfillOptions } from '@vitejs/plugin-legacy'
import createPlugin from '@vitejs/plugin-vue-jsx'
import {createHtmlPlugin} from 'vite-plugin-html'


export interface ViteBuildConfig {
    viteOption: UserConfig;
    viteVuePlugin: Options;
    viteVueJsx: Parameters<typeof createPlugin>[0];
    viteLegacy: PolyfillOptions;
    viteHtml: Parameters<typeof createHtmlPlugin>[0]
}
