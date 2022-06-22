import '@fesjs/fes';

declare module '@fesjs/fes' {

    interface PluginBuildConfig {
        model?: {} | false;
    }

    export function useModel(moduleId: string): any;
}
