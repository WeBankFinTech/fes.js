import { Component } from 'vue';
import { FrameworkLifeCycles, MicroApp } from 'qiankun';

interface AppOption {
    name: string;
    entry: string;
    props: Record<string, any>;
}

declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        qiankun?:
            | {
                  main?: {
                      apps: AppOption[];
                      lifeCycles?: FrameworkLifeCycles<MicroApp>;
                      [key: string]: any;
                  };
                  micro?: {};
              }
            | false;
    }

    export const MicroApp: Component;
    export const MicroAppWithMemoHistory: Component;
}
