// @ts-ignore
import type { PluginRuntimeConfig, PluginBuildConfig } from '@@/configType';

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

export function defineBuildConfig(config: PluginBuildConfig ): PluginBuildConfig;

export function defineRuntimeConfig(config:  PluginRuntimeConfig):  PluginRuntimeConfig;

