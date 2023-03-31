import { Router, RouteLocationNormalized, NavigationGuardNext, NavigationGuardReturn, NavigationGuard } from 'vue-router';
import { Ref } from 'vue';

export const access: {
    hasAccess(accessId: string | number): Promise<boolean>;
    isDataReady(): boolean;
    setRole(roleId: string | Promise<string>): void;
    setAccess(accessIds: Array<string | number> | Promise<Array<string | number>>): void;
    getAccess(): string[];
};

export function useAccess(accessId: Array<string | number>): Ref<boolean>;

interface CustomNavigationGuardOption {
    router: Router;
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    next: NavigationGuardNext;
}

interface CustomNavigationGuard {
    (option: CustomNavigationGuardOption): NavigationGuardReturn | Promise<NavigationGuardReturn>;
}

declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        access?:
            | {
                  rules: Record<string, []>;
              }
            | false;
    }

    interface PluginRuntimeConfig {
        access?: {
            noFoundHandler: NavigationGuard;
            unAccessHandler: CustomNavigationGuard;
        };
    }
}
