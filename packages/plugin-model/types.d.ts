import '@fesjs/fes';

export function useModel(moduleId: string): any;
declare module '@fesjs/fes' {

    interface PluginBuildConfig {
        model?: {} | false;
    }
}
