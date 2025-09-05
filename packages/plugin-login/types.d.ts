import '@fesjs/fes';

declare module '@fesjs/fes' {
    interface PluginRuntimeConfig {
        login?: {
            loginPath?: string;
            hasLogin?: () => boolean | Promise<boolean>;
        };
    }
}
