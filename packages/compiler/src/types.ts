import type Config from './config';
import type Service from './service';
import type { ApplyPluginsType, EnableBy } from './service/enums';
import type PluginAPI from './service/pluginAPI';

export type ConfigInstance = InstanceType<typeof Config>;
export type ServiceInstance = InstanceType<typeof Service>;
export type PluginAPIInstance = InstanceType<typeof PluginAPI>;

// Enums
export type { ApplyPluginsType, ConfigChangeType, EnableBy, PluginType, ServiceStage } from './service/enums';

// Utility types
export interface UserConfig {
    [key: string]: any;
}

export interface Paths {
    tmpDir: string;
    cwd: string;
    absNodeModulesPath: string;
    absOutputPath: string;
    absSrcPath: string;
    absPagesPath: string;
    absTmpPath: string;
}

export interface Plugin {
    id: string;
    key: string;
    path: string;
    apply: () => Promise<any> | any;
    config?: PluginConfig;
    enableBy?: EnableBy | (() => boolean);
    isPreset?: boolean;
    defaultConfig: any;
}

export interface PluginConfig {
    schema?: (joi: any) => any;
    default?: any;
}

export interface Hook {
    key: string;
    fn: (...args: any[]) => any;
    pluginId?: string;
    stage?: number;
    before?: string;
}

export interface CommandOption {
    command: string;
    description: string;
    options?: CommandOptionConfig[];
    fn?: (args: CommandArgs) => Promise<void> | void;
}

export interface CommandOptionConfig {
    name: string;
    description: string;
    default?: any;
    choices?: string[];
}

export interface CommandArgs {
    rawArgv: Record<string, any>;
    args: Record<string, any>;
    options: Record<string, any>;
    program: any;
}

export interface ApplyPluginsOptions {
    key: string;
    type: ApplyPluginsType;
    initialValue?: any;
    args?: any;
}

export interface ResolvePresetsOptions {
    presets?: string[];
    userConfigPresets?: string[];
    builder?: string;
    pkg: Record<string, any>;
    cwd: string;
}

export interface ResolvePluginsOptions {
    plugins?: string[];
    userConfigPlugins?: string[];
    builder?: string;
    pkg: Record<string, any>;
    cwd: string;
}
