import {Component, VNode, Ref } from 'vue';
import { Router, NavigationGuard } from 'vue-router';

interface Menu {
    name: string;
    path: string;
    match: string[];
    title: string;
    icon: string | Component;
    children?: Menu[]
}

declare module "@fesjs/fes" {
    interface PluginBuildConfig {
        layout: {
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
        };
    }
    interface PluginRuntimeConfig {
        layout: {
            footer: string;
            theme: 'dark' | 'light';
            navigation: 'side' | 'top' | 'mixin' | 'left-right';
            title: string;
            isFixedHeader: boolean;
            isFixedSidebar: boolean;
            logo: string;
            multiTabs: boolean;
            sideWidth: number;
            menus: Menu[] | (()=> (Ref<Menu[]> | Menu[]));
            menuProps: {
                expandedKeys: string[];
                defaultExpandAll: boolean;
                accordion: boolean;
            };
            renderCustom: ()=> VNode[],
            noFoundHandler: (param: { router: Router } & NavigationGuard) => void;
            unAccessHandler: (param: { router: Router } & NavigationGuard) => void;
        };
    }
}
