import { Component, VNode, Ref } from 'vue';
import { Router, NavigationGuard } from 'vue-router';

interface Menu {
    name: string;
    path: string;
    match: string[];
    title: string;
    icon: string | Component;
    children?: Menu[];
}

export const Page: Component;

export function useTabTitle(title: string | Ref<string>): void;

interface LayoutRuntimeConfig {
    footer?: string;
    theme?: 'dark' | 'light';
    navigation?: 'side' | 'top' | 'mixin' | 'left-right';
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
    noFoundHandler?: (param: { router: Router } & NavigationGuard) => void;
    unAccessHandler?: (param: { router: Router } & NavigationGuard) => void;
}

declare module '@fesjs/fes' {
    interface RouteMeta {
        'keep-alive'?: boolean;
        layout?: {
            navigation?: 'side' | 'mixin' | 'top' | 'left-right' | null;
        };
    }
    interface PluginBuildConfig {
        layout?:
            | {
                  footer: string;
                  theme: 'dark' | 'light';
                  navigation: 'side' | 'top' | 'mixin' | 'left-right';
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
