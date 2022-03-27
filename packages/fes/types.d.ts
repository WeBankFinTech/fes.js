import { Component, DefineComponent, App } from 'vue';
import { RouteRecordRaw, Router } from 'vue-router';
import { Plugin } from '@fesjs/runtime';
import { PluginRuntimeConfig } from '@@/runtime';

// @ts-ignore
export * from '@@/core/coreExports';
// @ts-ignore
export * from '@@/core/pluginExports';

interface RouteMeta {
    name?: string;
    title?: string;
    layout?: boolean | { sidebar?: boolean; header?: boolean; logo?: boolean };
}

export declare function defineRouteMeta(routeMeta: RouteMeta): RouteMeta;


interface BeforeRenderConfig {
    loading: Component;
    action: () => Promise<any>;
}

interface ClientRenderOption {
    routes: RouteRecordRaw[];
    rootElement: string;
    defaultTitle: string;
    plugin: Plugin;
}

type RenderFunc = () => Promise<App>

interface InnerRuntimeConfig {
    beforeRender?: (option: BeforeRenderConfig) => BeforeRenderConfig;
    patchRoutes?: ({ routes }: { routes: RouteRecordRaw[] }) => void;
    modifyClientRenderOpts?: (option: ClientRenderOption) => ClientRenderOption;
    rootContainer?: (component: DefineComponent, option: { routes: RouteRecordRaw[], plugin: Plugin }) => DefineComponent;
    onAppCreated?: ({ app, routes }: { app: App, routes: RouteRecordRaw[] }) => void;
    render?: (defaultRender: RenderFunc) => RenderFunc;
    onRouterCreated?: ({ router }: { router: Router }) => void;
}

export function defineRuntimeConfig(config: InnerRuntimeConfig & PluginRuntimeConfig): InnerRuntimeConfig & PluginRuntimeConfig;

