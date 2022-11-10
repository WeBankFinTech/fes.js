import type { Pinia } from 'pinia';

export const pinia: Pinia;
declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        pinia?: {} | false;
    }
}
