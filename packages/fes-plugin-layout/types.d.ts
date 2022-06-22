import { Component } from 'vue';
import { Router, NavigationGuard } from 'vue-router';

interface Menu {
    name: string;
    path: string;
    match: string[];
    title: string;
    icon: string;
    children?: Menu[]
}

declare module "@fesjs/fes" {
    interface PluginBuildConfig {
        layout: {
            title: string;
            footer: string;
            theme: 'dark' | 'light';
            multiTabs: boolean;
            navigation: 'side' | 'top' | 'mixin';
            fixedHeader: boolean;
            fixedSideBar: boolean;
            sideWidth: number;
            menus: Menu[];
        };
    }
    interface PluginRuntimeConfig {
        layout: {
            header: boolean;
            sidebar: boolean;
            logo: boolean;
            customHeader: Component,
            noFoundHandler: (param: { router: Router } & NavigationGuard) => void;
            unAccessHandler: (param: { router: Router } & NavigationGuard) => void;
        };
    }
}