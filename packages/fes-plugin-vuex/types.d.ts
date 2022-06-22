import '@fesjs/fes';
declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        vuex?:
            | {
                  strict: boolean;
                  devtools: boolean;
              }
            | false;
    }

    export const MUTATION_TYPES: object;

    export const ACTION_TYPES: object;

    export const GETTER_TYPES: object;

    export const store: object;
}