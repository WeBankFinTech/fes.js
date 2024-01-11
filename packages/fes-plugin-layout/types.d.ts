import type { MenuOption } from '@fesjs/fes-design/es/menu/interface';
import type { Component, Ref, VNode } from 'vue';
import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';

interface CustomNavigationGuardOption {
    router: Router;
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    next: NavigationGuardNext;
}

interface CustomNavigationGuard {
    (option: CustomNavigationGuardOption): ReturnType<NavigationGuard>;
}

interface Menu {
    name?: string;
    path?: string;
    match?: string[];
    title?: MenuOption['label'];
    icon?: string | Component;
    children?: Menu[];
}

type Navigation = 'side' | 'mixin' | 'top' | 'left-right';

export const Page: Component;

export function useTabTitle(title: string | Ref<string>): void;

interface LayoutRuntimeConfig {
    footer?: string;
    theme?: 'dark' | 'light';
    navigation?: Navigation;
    navigationOnError?: Navigation | ((route: RouteLocationNormalized) => Navigation | null);
    title?: string;
    isFixedHeader?: boolean;
    isFixedSidebar?: boolean;
    logo?: string;
    multiTabs?: boolean;
    sideWidth?: number;
    menus?: Menu[] | (() => Ref<Menu[]> | Menu[]);
    menuProps?: {
        expandedKeys?: string[];
        defaultExpandAll?: boolean;
        accordion?: boolean;
    };
    renderCustom?: () => VNode | VNode[];
    noFoundHandler?: CustomNavigationGuard;
    unAccessHandler?: CustomNavigationGuard;
}

declare module '@fesjs/fes' {
    interface RouteMeta {
        'keep-alive'?: boolean;
        layout?: {
            navigation?: Navigation | null;
        };
    }
    interface PluginBuildConfig {
        layout?:
            | {
                footer: string;
                theme: 'dark' | 'light';
                navigation: Navigation;
                navigationOnError: Navigation;
                title: string;
                isFixedHeader: boolean;
                isFixedSidebar: boolean;
                logo: string;
                multiTabs: boolean;
                sideWidth: number;
                menus: Menu[];
                menuProps: {
                    expandedKeys: string[];
                    defaultExpandAll: boolean;
                    accordion: boolean;
                };
            }
            | false;
    }
    interface PluginRuntimeConfig {
        layout?: LayoutRuntimeConfig | ((layoutRuntimeConfig: LayoutRuntimeConfig, { initialState }: { initialState: any }) => LayoutRuntimeConfig);
    }
}
