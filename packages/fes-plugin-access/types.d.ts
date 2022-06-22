import { Router, NavigationGuard } from 'vue-router';

declare module "@fesjs/fes" {
    interface PluginBuildConfig {
        access: {
            rules: Record<string, []>;
        };
    }

    interface PluginRuntimeConfig {
        access: {
            noFoundHandler: (param: { router: Router } & NavigationGuard) => void;
            unAccessHandler: (param: { router: Router } & NavigationGuard) => void;
        };
    }
}
