import { Router, NavigationGuard } from 'vue-router';

export interface AccessBuildConfig {
    access: {
        rules: Record<string, []>;
    };
}

export interface AccessRuntimeConfig {
    access: {
        noFoundHandler: (param: { router: Router } & NavigationGuard) => void;
        unAccessHandler: (param: { router: Router } & NavigationGuard) => void;
    };
}
