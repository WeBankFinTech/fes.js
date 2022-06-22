declare module "@fesjs/fes" {
    interface PluginBuildConfig {
        locale: {
            locale: string;
            fallbackLocale: string;
            baseNavigator: boolean;
            legacy: boolean;
        };
    }
}
