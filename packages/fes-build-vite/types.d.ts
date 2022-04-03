import type {UserConfig} from 'vite';
import type {Options} from '@vitejs/plugin-vue'
import createPlugin from '@vitejs/plugin-vue-jsx'


export interface ViteBuildConfig {
    viteOption: UserConfig;
    viteVuePlugin: Options;
    viteVueJsx: Parameters<typeof createPlugin>[0];
}
