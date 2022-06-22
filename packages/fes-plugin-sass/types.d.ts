import '@fesjs/fes';

declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        sass?:
            | {
                  implementation: any;
                  sassOptions: object;
                  sourceMap: boolean;
                  webpackImporter: boolean;
              }
            | false;
    }
}
