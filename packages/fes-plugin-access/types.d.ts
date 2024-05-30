import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import type { Ref } from 'vue';

export const access: {
    hasAccess: (accessId: string | number) => Promise<boolean>;
    hasAccessSync: (accessId: string | number) => boolean;
    isDataReady: () => boolean;
    setRole: (roleId: string | Promise<string>) => void;
    getRole: () => string;
    setAccess: (accessIds: Array<string | number> | Promise<Array<string | number>>) => void;
    getAccess: () => string[];
    match: (path: string, accessIds: string[]) => boolean;
    setPresetAccess: (accessId: string | string[]) => void;
};

export function useAccess(accessId: string | number): Ref<boolean>;

interface CustomNavigationGuardOption {
    router: Router;
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    next: NavigationGuardNext;
}

interface CustomNavigationGuard {
    (option: CustomNavigationGuardOption): ReturnType<NavigationGuard>;
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
            noFoundHandler?: CustomNavigationGuard;
            unAccessHandler?: CustomNavigationGuard;
            ignoreAccess?: string[];
        };
    }
}
