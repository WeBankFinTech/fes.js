import type * as utils from '@fesjs/utils';

import type { BuildConfig } from './config';
import type { ApplyPluginsType, ConfigChangeType, Paths } from './core';

type Utils = typeof utils;

export enum EnableBy {
    register = 'register',
    config = 'config',
}

export interface PluginConfig {
    schema?: (joi: any) => any;
    default?: any;
    onChange?: ConfigChangeType;
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

export interface CommandOption {
    command: string;
    description: string;
    options?: CommandOptionConfig[];
    fn?: (args: CommandArgs) => any;
}

export interface Hook {
    key: string;
    fn: (...args: any[]) => any;
    pluginId?: string;
    stage?: number;
    before?: string;
}

interface DescribeOptions {
    id?: string;
    key?: string;
    config?: PluginConfig;
    enableBy?: EnableBy | (() => boolean);
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

export interface PluginApiBase {
    describe: (params: DescribeOptions) => void;
    register: (hook: Hook) => void;
    registerCommand: (commandOption: CommandOption) => any;
    registerPlugins: (plugins: (string | Plugin)[]) => Promise<void>;
    registerPresets: (plugins: (string | Plugin)[]) => Promise<void>;
    registerMethod: ({ name, fn, exitsError }: { name: string; fn?: (...args: any[]) => any; exitsError?: boolean }) => void;
    registerBuilder: (builder: Record<string, any>) => void;
    skipPlugins: (pluginIds: string[]) => void;
}

export interface IPluginAPI<T = Record<string, any>> extends PluginApiBase {
    env: string;
    cwd: string;
    title: string;
    ApplyPluginsType: typeof ApplyPluginsType;
    ConfigChangeType: typeof ConfigChangeType;
    utils: Utils;
    paths: Paths;
    userConfig: Record<string, any>;
    config: BuildConfig & T;
    pkg: Record<string, any>;
    builder: {
        name: string;
    };
    applyPlugins: (params: {
        type: ApplyPluginsType;
        key: string;
        initialValue?: any;
        args?: any;
    }) => any;
    hasPlugins: (pluginIds: string[]) => boolean;
    startWatch: () => Promise<void>;
    modifyBundleConfig: (fn: (memo: any) => any) => any;
    addConfigType: (fn: () => ({ source: string })) => any;
    addRuntimePluginKey: (fn: () => string) => void;
    addRuntimePlugin: (fn: () => string) => void;
    addPluginExports: (fn: () => ({ exportAll?: boolean; specifiers?: string[]; source: string }[])) => void;
    copyTmpFiles: (opts: { namespace: string; path: string; ignore?: string[] }) => void;
    writeTmpFile: (opts: { path: string; content: string }) => void;
    onGenerateFiles: (fn: () => void) => void;
    modifyConfig: (fn: (memo: BuildConfig & T) => BuildConfig & T) => void;
    addTmpGenerateWatcherPaths: (fn: () => string) => void;
}
