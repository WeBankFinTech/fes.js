import type commander from 'commander';
import type {
    ApplyPluginsOptions,
    CommandOption,
    ConfigInstance,
    Hook,
    Paths,
    Plugin,
    ResolvePluginsOptions,
    ResolvePresetsOptions,
    UserConfig,
} from '../types';
import assert from 'node:assert';
import { EventEmitter } from 'node:events';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { chalk, lodash } from '@fesjs/utils';
import { Command, Option } from 'commander';
import { readJSONSync } from 'fs-extra/esm';
import { AsyncSeriesWaterfallHook } from 'tapable';
import Config from '../config';
import { getUserConfigWithKey } from '../config/utils/configUtils';
import { ApplyPluginsType, ConfigChangeType, EnableBy, PluginType, ServiceStage } from './enums';
import getPaths from './getPaths';
import PluginAPI from './pluginAPI';
import isPromise from './utils/isPromise';
import loadDotEnv from './utils/loadDotEnv';
import { pathToObj, resolvePlugins, resolvePresets } from './utils/pluginUtils';

interface ServiceOptions {
    cwd?: string;
    pkg?: Record<string, any>;
    env?: string;
    fesPkg?: Record<string, any>;
    presets?: string[];
    plugins?: string[];
}

interface SetupOptions {
    presets?: string[];
    plugins?: string[];
}

interface ApplyAPIOptions {
    apply: () => Promise<any> | any;
    api: any;
}

interface InitPresetResult {
    presets?: string[];
    plugins?: string[];
}

interface ApplyPluginsOptionsExtended extends ApplyPluginsOptions {
    args?: any;
}

interface RunOptions {
    rawArgv?: Record<string, any>;
    args?: Record<string, any>;
}

interface RunCommandOptions {
    rawArgv?: Record<string, any>;
    args?: Record<string, any>;
}

// TODO
// 1. duplicated key
export default class Service extends EventEmitter {
    cwd: string;

    pkg: Record<string, any>;

    skipPluginIds: Set<string> = new Set();

    // lifecycle stage
    stage: ServiceStage = ServiceStage.uninitialized;

    // registered commands
    commands: Record<string, CommandOption> = {};

    // including plugins
    plugins: Record<string, Plugin> = {};

    // 构建
    builder: Record<string, any> = {};

    // plugin methods
    pluginMethods: Record<string, () => void> = {};

    // initial presets and plugins from arguments, config, process.env, and package.json
    initialPresets: Plugin[] = [];

    // initial plugins from arguments, config, process.env, and package.json
    initialPlugins: Plugin[] = [];

    _extraPresets: Plugin[] = [];

    _extraPlugins: Plugin[] = [];

    // user config
    userConfig: UserConfig;

    configInstance: ConfigInstance;

    config: UserConfig | null = null;

    // hooks
    hooksByPluginId: Record<string, Hook[]> = {};

    hooks: Record<string, Hook[]> = {};

    // paths
    paths: Paths;

    env: string;

    ApplyPluginsType = ApplyPluginsType;

    EnableBy = EnableBy;

    ConfigChangeType = ConfigChangeType;

    ServiceStage = ServiceStage;

    args: Record<string, any> | undefined;

    fesPkg: Record<string, any>;

    program: commander.Command;

    ready: Promise<boolean>;

    constructor(opts: ServiceOptions) {
        super();
        this.cwd = opts.cwd || process.cwd();
        // repoDir should be the root dir of repo
        this.pkg = opts.pkg || this.resolvePackage();
        this.env = opts.env || process.env.NODE_ENV || 'development';
        this.fesPkg = opts.fesPkg || {};
        this.userConfig = {};

        assert(existsSync(this.cwd), `cwd ${this.cwd} does not exist.`);

        this.program = this.initCommand();

        // load .env or .local.env
        this.loadEnv();

        this.configInstance = new Config({
            cwd: this.cwd,
            service: this,
            localConfig: this.env === 'development',
        });

        // get paths
        this.paths = getPaths({
            cwd: this.cwd,
            config: this.userConfig,
            env: this.env,
        });

        this.ready = this.setup(opts);
    }

    async setup(opts: SetupOptions): Promise<boolean> {
        // get user config without validation

        this.userConfig = await this.configInstance.getUserConfig();

        // setup initial plugins
        const baseOpts: ResolvePresetsOptions & ResolvePluginsOptions = {
            pkg: this.pkg,
            cwd: this.cwd,
            builder: this.userConfig.builder as string,
        };
        this.initialPresets = await resolvePresets({
            ...baseOpts,
            presets: opts.presets || [],
            userConfigPresets: (this.userConfig.presets as string[]) || [],
        });
        this.initialPlugins = await resolvePlugins({
            ...baseOpts,
            plugins: opts.plugins || [],
            userConfigPlugins: (this.userConfig.plugins as string[]) || [],
        });
        return true;
    }

    setStage(stage: ServiceStage): void {
        this.stage = stage;
    }

    resolvePackage(): Record<string, any> {
        try {
            return readJSONSync(join(this.cwd, 'package.json'));
        }
        catch {
            return {};
        }
    }

    loadEnv(): void {
        const basePath = join(this.cwd, '.env');
        const localPath = `${basePath}.local`;
        loadDotEnv(basePath);
        if (process.env.FES_ENV) {
            loadDotEnv(`${basePath}.${process.env.FES_ENV}`);
        }
        loadDotEnv(localPath);
    }

    async init(): Promise<void> {
        this.setStage(ServiceStage.init);
        await this.initPresetsAndPlugins();

        // hooksByPluginId -> hooks
        // hooks is mapped with hook key, prepared for applyPlugins()
        this.setStage(ServiceStage.initHooks);
        Object.keys(this.hooksByPluginId).forEach((id: string) => {
            const hooks = this.hooksByPluginId[id];
            hooks.forEach((hook: Hook) => {
                const { key } = hook;
                hook.pluginId = id;
                this.hooks[key] = (this.hooks[key] || []).concat(hook);
            });
        });

        // plugin is totally ready
        this.setStage(ServiceStage.pluginReady);
        await this.applyPlugins({
            key: 'onPluginReady',
            type: ApplyPluginsType.event,
        });

        // get config, including:
        // 1. merge default config
        // 2. validate
        this.setStage(ServiceStage.getConfig);
        await this.setConfig();

        // merge paths to keep the this.paths ref
        this.setStage(ServiceStage.getPaths);
        // config.outputPath may be modified by plugins
        if (this.config?.outputPath) {
            this.paths.absOutputPath = join(this.cwd, this.config.outputPath as string);
        }
        const paths = await this.applyPlugins({
            key: 'modifyPaths',
            type: ApplyPluginsType.modify,
            initialValue: this.paths,
        }) as Paths;
        Object.assign(this.paths, paths);
    }

    async setConfig(): Promise<void> {
        const defaultConfig = await this.applyPlugins({
            key: 'modifyDefaultConfig',
            type: this.ApplyPluginsType.modify,
            initialValue: await this.configInstance.getDefaultConfig(),
        }) as Record<string, any>;
        const initConfig = await this.configInstance.getConfig(defaultConfig);
        this.config = await this.applyPlugins({
            key: 'modifyConfig',
            type: this.ApplyPluginsType.modify,
            initialValue: initConfig,
        });
    }

    async initPresetsAndPlugins(): Promise<void> {
        this.setStage(ServiceStage.initPresets);
        this._extraPlugins = [];
        while (this.initialPresets.length) {
            await this.initPreset(this.initialPresets.shift()!);
        }

        this.setStage(ServiceStage.initPlugins);
        this._extraPlugins.push(...this.initialPlugins);
        while (this._extraPlugins.length) {
            const plugin = this._extraPlugins.shift();
            await this.initPlugin(plugin!);
        }
    }

    getPluginAPI(opts: { id: string; key: string; service: Service }): PluginAPI {
        const pluginAPI = new PluginAPI(opts);

        // register built-in methods
        ['onPluginReady', 'modifyPaths', 'onStart', 'modifyDefaultConfig', 'modifyConfig'].forEach((name) => {
            pluginAPI.registerMethod({
                name,
                exitsError: false,
            });
        });

        return new Proxy(pluginAPI, {
            get: (target, prop: string) => {
                // 由于 pluginMethods 需要在 register 阶段可用
                // 必须通过 proxy 的方式动态获取最新，以实现边注册边使用的效果
                if (this.pluginMethods[prop]) {
                    return this.pluginMethods[prop];
                }
                if (
                    [
                        'applyPlugins',
                        'ApplyPluginsType',
                        'EnableBy',
                        'ConfigChangeType',
                        'stage',
                        'ServiceStage',
                        'paths',
                        'cwd',
                        'pkg',
                        'configInstance',
                        'userConfig',
                        'config',
                        'env',
                        'args',
                        'hasPlugins',
                        'hasPresets',
                        'setConfig',
                        'builder',
                    ].includes(prop)
                ) {
                    // @ts-expect-error ignore property
                    return typeof this[prop] === 'function' ? this[prop].bind(this) : this[prop];
                }
                // @ts-expect-error ignore property
                return target[prop];
            },
        });
    }

    async applyAPI(opts: ApplyAPIOptions): Promise<any> {
        const module = await opts.apply();
        let ret = module(opts.api);

        if (isPromise(ret)) {
            ret = await ret;
        }
        return ret || {};
    }

    async initPreset(preset: Plugin): Promise<void> {
        const { id, key, apply } = preset;
        preset.isPreset = true;

        const api = this.getPluginAPI({ id, key, service: this });

        // register before apply
        this.registerPlugin(preset);
        const { presets, plugins } = await this.applyAPI({
            api,
            apply,
        }) as InitPresetResult;

        // register extra presets and plugins
        if (presets) {
            assert(Array.isArray(presets), `presets returned from preset ${id} must be Array.`);
            // 插到最前面，下个 while 循环优先执行
            const _presets = await Promise.all(presets.map(path =>
                pathToObj({
                    type: PluginType.preset,
                    path,
                    cwd: this.cwd,
                }),
            ));
            this._extraPresets.splice(
                0,
                0,
                ..._presets,
            );
        }

        // 深度优先
        const extraPresets = lodash.clone(this._extraPresets);
        this._extraPresets = [];
        while (extraPresets.length) {
            await this.initPreset(extraPresets.shift()!);
        }

        if (plugins) {
            assert(Array.isArray(plugins), `plugins returned from preset ${id} must be Array.`);
            const _plugins = await Promise.all(plugins.map(path =>
                pathToObj({
                    type: PluginType.plugin,
                    path,
                    cwd: this.cwd,
                }),
            ));
            this._extraPlugins.push(
                ..._plugins,
            );
        }
    }

    async initPlugin(plugin: Plugin): Promise<void> {
        const { id, key, apply } = plugin;

        const api = this.getPluginAPI({
            id,
            key,
            service: this,
        });

        // register before apply
        this.registerPlugin(plugin);
        await this.applyAPI({
            api,
            apply,
        });
    }

    getPluginOptsWithKey(key: string): any {
        return getUserConfigWithKey({
            key,
            userConfig: this.userConfig,
        });
    }

    registerPlugin(plugin: Plugin): void {
        this.plugins[plugin.id] = plugin;
    }

    isPluginEnable(pluginId: string): boolean {
        // api.skipPlugins() 的插件
        if (this.skipPluginIds.has(pluginId)) {
            return false;
        }

        const plugin = this.plugins[pluginId];
        if (!plugin) {
            return false;
        }

        const { key, enableBy } = plugin;

        // 手动设置为 false
        if (this.userConfig[key] === false) {
            return false;
        }

        // 配置开启
        if (enableBy === this.EnableBy.config && !(key in this.userConfig)) {
            return false;
        }

        // 函数自定义开启
        if (typeof enableBy === 'function') {
            return enableBy();
        }

        // 注册开启
        return true;
    }

    hasPresets(presetIds: string[]): boolean {
        return presetIds.every((presetId) => {
            const preset = this.plugins[presetId];
            return preset && preset.isPreset && this.isPluginEnable(presetId);
        });
    }

    hasPlugins(pluginIds: string[]): boolean {
        return pluginIds.every((pluginId) => {
            const plugin = this.plugins[pluginId];
            return plugin && !plugin.isPreset && this.isPluginEnable(pluginId);
        });
    }

    async applyPlugins<T>(opts: ApplyPluginsOptionsExtended): Promise<T> {
        const hooks = this.hooks[opts.key] || [];
        switch (opts.type) {
            case ApplyPluginsType.add:
                if ('initialValue' in opts) {
                    assert(Array.isArray(opts.initialValue), 'applyPlugins failed, opts.initialValue must be Array if opts.type is add.');
                }
                // eslint-disable-next-line no-case-declarations
                const tAdd = new AsyncSeriesWaterfallHook(['memo']);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId!)) {
                        continue;
                    }
                    tAdd.tapPromise(
                        {
                            name: hook.pluginId!,
                            stage: hook.stage || 0,
                            before: hook.before,
                        },
                        async (memo) => {
                            const items = await hook.fn(opts.args);
                            return (memo as any[]).concat(items);
                        },
                    );
                }
                return tAdd.promise(opts.initialValue || []) as Promise<T>;
            case ApplyPluginsType.modify:
                // eslint-disable-next-line no-case-declarations
                const tModify = new AsyncSeriesWaterfallHook(['memo']);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId!)) {
                        continue;
                    }
                    tModify.tapPromise(
                        {
                            name: hook.pluginId!,
                            stage: hook.stage || 0,
                            before: hook.before,
                        },
                        async (memo: any) => hook.fn(memo, opts.args),
                    );
                }
                return tModify.promise(opts.initialValue) as Promise<T>;
            case ApplyPluginsType.event:
                // eslint-disable-next-line no-case-declarations
                const tEvent = new AsyncSeriesWaterfallHook(['_']);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId!)) {
                        continue;
                    }
                    tEvent.tapPromise(
                        {
                            name: hook.pluginId!,
                            stage: hook.stage || 0,
                            before: hook.before,
                        },
                        async () => {
                            await hook.fn(opts.args);
                        },
                    );
                }
                return tEvent.promise(true) as Promise<T>;
            default:
                throw new Error(`applyPlugin failed, type is not defined or is not matched, got ${(opts as any).type}.`);
        }
    }

    initCommand(): commander.Command {
        const command = new Command();
        command
            .usage('<command> [options]')
            .version(`@fesjs/fes ${this.fesPkg.version || ''}`, '-v, --vers', 'output the current version')
            .description(chalk.cyan('一个好用的前端应用解决方案'));
        return command;
    }

    async run({ rawArgv = {}, args = {} }: RunOptions): Promise<any> {
        await this.init();

        this.setStage(ServiceStage.run);
        await this.applyPlugins({
            key: 'onStart',
            type: ApplyPluginsType.event,
            args: {
                args,
            },
        });

        return this.runCommand({ rawArgv, args });
    }

    async runCommand({ rawArgv = {}, args = {} }: RunCommandOptions): Promise<any> {
        assert(this.stage >= ServiceStage.init, 'service is not initialized.');
        Object.keys(this.commands).forEach((command: string) => {
            const commandOptionConfig = this.commands[command];
            const program = this.program;
            let c = program.command(command).description(commandOptionConfig.description);
            if (Array.isArray(commandOptionConfig.options)) {
                commandOptionConfig.options.forEach((config) => {
                    const option = new Option(config.name, config.description);
                    if (config.default) {
                        option.default(config.default);
                    }
                    if (config.choices) {
                        option.choices(config.choices);
                    }
                    c = c.addOption(option);
                });
            }
            if (commandOptionConfig.fn) {
                c.action(async () => {
                    await commandOptionConfig.fn!({
                        rawArgv,
                        args,
                        options: c.opts(),
                        program,
                    });
                });
            }
        });

        return this.parseCommand();
    }

    async parseCommand(): Promise<any> {
        this.program.on('--help', () => {
            // eslint-disable-next-line no-console
            console.log();
            // eslint-disable-next-line no-console
            console.log(`  Run ${chalk.cyan('fes <command> --help')} for detailed usage of given command.`);
            // eslint-disable-next-line no-console
            console.log();
        });
        this.program.commands.forEach(c => c.on('--help', () => {
            // eslint-disable-next-line no-console
            console.log();
        }));
        return this.program.parseAsync(process.argv);
    }
}
