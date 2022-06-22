import type { Pinia } from 'pinia';

declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        pinia?: {} | false;
    }

    export const pinia: Pinia;
}
