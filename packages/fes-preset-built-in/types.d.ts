import { Component, DefineComponent, App } from 'vue';
import { RouteRecordRaw, Router } from 'vue-router';

// @ts-ignore
import { Plugin } from '@fesjs/runtime';

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

export interface InnerRuntimeConfig {
    beforeRender?: (option: BeforeRenderConfig) => BeforeRenderConfig;
    patchRoutes?: ({ routes }: { routes: RouteRecordRaw[] }) => void;
    modifyClientRenderOpts?: (option: ClientRenderOption) => ClientRenderOption;
    rootContainer?: (component: DefineComponent, option: { routes: RouteRecordRaw[], plugin: Plugin }) => DefineComponent;
    onAppCreated?: ({ app, routes }: { app: App, routes: RouteRecordRaw[] }) => void;
    render?: (defaultRender: RenderFunc) => RenderFunc;
    onRouterCreated?: ({ router }: { router: Router }) => void;
}


export interface InnerBuildConfig {
    alias?: Record<string, string>,
    autoprefixer?: {
        /** environment for `Browserslist` */
        env?: string
    
        /** should Autoprefixer use Visual Cascade, if CSS is uncompressed */
        cascade?: boolean
    
        /** should Autoprefixer add prefixes. */
        add?: boolean
    
        /** should Autoprefixer [remove outdated] prefixes */
        remove?: boolean
    
        /** should Autoprefixer add prefixes for @supports parameters. */
        supports?: boolean
    
        /** should Autoprefixer add prefixes for flexbox properties */
        flexbox?: boolean | 'no-2009'
    
        /** should Autoprefixer add IE 10-11 prefixes for Grid Layout properties */
        grid?: boolean
    
        /**
         * list of queries for target browsers.
         * Try to not use it.
         * The best practice is to use `.browserslistrc` config or `browserslist` key in `package.json`
         * to share target browsers with Babel, ESLint and Stylelint
         */
        overrideBrowserslist?: string | string[]
    
        /** do not raise error on unknown browser version in `Browserslist` config. */
        ignoreUnknownVersions?: boolean
    };
    define?: Record<string, string | object>,
    router?: {
        base?: string;
        routes?: RouteRecordRaw[];
        mode?: 'hash' | 'history' | 'memory'
    };
    dynamicImport?: boolean;
    inlineLimit?: number;
    mock?: boolean | {
        prefix?: string;
    };
    mountElementId?: string;
    plugins?: string[];
    proxy?: {
        [apiPrefix: string]: {
            target: string;
            changeOrigin?: boolean;
        }
    };
    publicPath?: string;
    singular?: boolean;
    targets?: object;
    terserOptions?: object;
    title?: string;
}