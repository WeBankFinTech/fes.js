import { Router, NavigationGuard } from 'vue-router';
import { Ref } from 'vue';

export function access(): {
    hasAccess(accessId: string | number): Promise<boolean>;
    isDataReady(): boolean;
    setRole(roleId: string | Promise<string>): void;
    setAccess(accessIds: Array<string | number> | Promise<Array<string | number>>): void;
    getAccess(): string[];
};

export function useAccess(accessId: Array<string | number>): Ref<boolean>;

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
            noFoundHandler: (param: { router: Router } & NavigationGuard) => void;
            unAccessHandler: (param: { router: Router } & NavigationGuard) => void;
        };
    }
}
