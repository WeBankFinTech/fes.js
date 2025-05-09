import type { App, Component, DefineComponent } from 'vue';
import type { createMemoryHistory, createWebHashHistory, createWebHistory, Router, RouteRecordRaw, RouterHistory } from 'vue-router';

// @ts-ignore
import type { Plugin } from '@fesjs/runtime';

interface BeforeRenderConfig {
    loading: Component;
    action: ({ router }: { router: Router }) => Promise<any>;
}

interface ClientRenderOption {
    routes: RouteRecordRaw[];
    rootElement: string;
    defaultTitle: string;
    plugin: Plugin;
}

type RenderFunc = () => Promise<App>;

interface Route {
    base: string;
    mode: string;
    routes: RouteRecordRaw[];
    createHistory: createMemoryHistory | createWebHashHistory | createWebHistory;
}

export function getRouter(): Router;
export function getHistory(): RouterHistory;
export function destroyRouter(): void;

declare module '@fesjs/fes' {
    interface PluginRuntimeConfig {
        beforeRender?: BeforeRenderConfig;
        patchRoutes?: ({ routes }: { routes: RouteRecordRaw[] }) => void;
        modifyRoute?: ({ base, mode, routes, createHistory }: Route) => Route;
        modifyClientRenderOpts?: (option: ClientRenderOption) => ClientRenderOption;
        rootContainer?: (component: DefineComponent, option: { routes: RouteRecordRaw[]; plugin: Plugin }) => Component;
        onAppCreated?: ({ app, routes }: { app: App; routes: RouteRecordRaw[] }) => void;
        render?: (defaultRender: RenderFunc) => RenderFunc;
        onRouterCreated?: ({ router }: { router: Router }) => void;
    }

    interface PluginBuildConfig {
        globalCSS?: 'beforeImports' | 'afterImports';
        alias?: Record<string, string>;
        console?: {
            version?: boolean;
        };
        autoprefixer?: {
            /** environment for `Browserslist` */
            env?: string;

            /** should Autoprefixer use Visual Cascade, if CSS is uncompressed */
            cascade?: boolean;

            /** should Autoprefixer add prefixes. */
            add?: boolean;

            /** should Autoprefixer [remove outdated] prefixes */
            remove?: boolean;

            /** should Autoprefixer add prefixes for @supports parameters. */
            supports?: boolean;

            /** should Autoprefixer add prefixes for flexbox properties */
            flexbox?: boolean | 'no-2009';

            /** should Autoprefixer add IE 10-11 prefixes for Grid Layout properties */
            grid?: boolean;

            /**
             * list of queries for target browsers.
             * Try to not use it.
             * The best practice is to use `.browserslistrc` config or `browserslist` key in `package.json`
             * to share target browsers with Babel, ESLint and Stylelint
             */
            overrideBrowserslist?: string | string[];

            /** do not raise error on unknown browser version in `Browserslist` config. */
            ignoreUnknownVersions?: boolean;
        };
        define?: Record<string, string | object>;
        router?: {
            base?: string;
            routes?: RouteRecordRaw[];
            mode?: 'hash' | 'history' | 'memory';
        };
        dynamicImport?: boolean;
        inlineLimit?: number;
        mock?:
            | boolean
            | {
                prefix?: string;
            };
        mountElementId?: string;
        plugins?: string[];
        presets?: string[];
        proxy?: {
            [apiPrefix: string]: {
                target: string;
                changeOrigin?: boolean;
            };
        };
        publicPath?: string;
        singular?: boolean;
        targets?: object;
        terserOptions?: object;
        title?: string;
    }
}
