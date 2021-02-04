import { join } from 'path';
import { EventEmitter } from 'events';
import assert from 'assert';
import { AsyncSeriesWaterfallHook } from 'tapable';
import { existsSync } from 'fs';
import { BabelRegister, lodash, chalk } from '@umijs/utils';
import { Command, Option } from 'commander';
import { resolvePresets, pathToObj, resolvePlugins } from './utils/pluginUtils';
import loadDotEnv from './utils/loadDotEnv';
import isPromise from './utils/isPromise';
import PluginAPI from './pluginAPI';
import {
    ApplyPluginsType,
    ConfigChangeType,
    EnableBy,
    PluginType,
    ServiceStage
} from './enums';
import Config from '../config';
import { getUserConfigWithKey } from '../config/utils/configUtils';
import getPaths from './getPaths';

// TODO
// 1. duplicated key
// 2. Logger
export default class Service extends EventEmitter {
    cwd;

    pkg;

    skipPluginIds = new Set();

    // lifecycle stage
    stage = ServiceStage.uninitialized;

    // registered commands
    commands = {};

    // including plugins
    plugins = {};

    // plugin methods
    pluginMethods = {};

    // initial presets and plugins from arguments, config, process.env, and package.json
    initialPresets = [];

    // initial plugins from arguments, config, process.env, and package.json
    initialPlugins = [];

    _extraPresets = [];

    _extraPlugins = [];

    // user config
    userConfig;

    configInstance;

    config = null;

    // babel register
    babelRegister;

    // hooks
    hooksByPluginId = {};

    hooks = {};

    // paths
    paths = {};

    env;

    ApplyPluginsType = ApplyPluginsType;

    EnableBy = EnableBy;

    ConfigChangeType = ConfigChangeType;

    ServiceStage = ServiceStage;

    args;

    constructor(opts) {
        super();
        this.cwd = opts.cwd || process.cwd();
        // repoDir should be the root dir of repo
        this.pkg = opts.pkg || this.resolvePackage();
        this.env = opts.env || process.env.NODE_ENV;
        this.fesPkg = opts.fesPkg || {};


        assert(existsSync(this.cwd), `cwd ${this.cwd} does not exist.`);

        // register babel before config parsing
        this.babelRegister = new BabelRegister();

        // load .env or .local.env
        this.loadEnv();

        // get user config without validation
        this.configInstance = new Config({
            cwd: this.cwd,
            service: this,
            localConfig: this.env === 'development'
        });
        this.userConfig = this.configInstance.getUserConfig();

        // get paths
        this.paths = getPaths({
            cwd: this.cwd,
            config: this.userConfig,
            env: this.env
        });

        this.program = new Command();

        this.initCommand();

        // setup initial plugins
        const baseOpts = {
            pkg: this.pkg,
            cwd: this.cwd
        };
        this.initialPresets = resolvePresets({
            ...baseOpts,
            presets: opts.presets || [],
            userConfigPresets: this.userConfig.presets || []
        });
        this.initialPlugins = resolvePlugins({
            ...baseOpts,
            plugins: opts.plugins || [],
            userConfigPlugins: this.userConfig.plugins || []
        });
    }

    setStage(stage) {
        this.stage = stage;
    }

    resolvePackage() {
        try {
            // eslint-disable-next-line
            return require(join(this.cwd, "package.json"));
        } catch (e) {
            return {};
        }
    }

    loadEnv() {
        const basePath = join(this.cwd, '.env');
        const localPath = `${basePath}.local`;
        loadDotEnv(basePath);
        loadDotEnv(localPath);
    }

    async init() {
        this.setStage(ServiceStage.init);
        await this.initPresetsAndPlugins();

        // hooksByPluginId -> hooks
        // hooks is mapped with hook key, prepared for applyPlugins()
        this.setStage(ServiceStage.initHooks);
        Object.keys(this.hooksByPluginId).forEach((id) => {
            const hooks = this.hooksByPluginId[id];
            hooks.forEach((hook) => {
                const { key } = hook;
                hook.pluginId = id;
                this.hooks[key] = (this.hooks[key] || []).concat(hook);
            });
        });

        // plugin is totally ready
        this.setStage(ServiceStage.pluginReady);
        await this.applyPlugins({
            key: 'onPluginReady',
            type: ApplyPluginsType.event
        });

        // get config, including:
        // 1. merge default config
        // 2. validate
        this.setStage(ServiceStage.getConfig);
        await this.setConfig();

        // merge paths to keep the this.paths ref
        this.setStage(ServiceStage.getPaths);
        // config.outputPath may be modified by plugins
        if (this.config.outputPath) {
            this.paths.absOutputPath = join(this.cwd, this.config.outputPath);
        }
        const paths = await this.applyPlugins({
            key: 'modifyPaths',
            type: ApplyPluginsType.modify,
            initialValue: this.paths
        });
        Object.keys(paths).forEach((key) => {
            this.paths[key] = paths[key];
        });
    }

    async setConfig() {
        const defaultConfig = await this.applyPlugins({
            key: 'modifyDefaultConfig',
            type: this.ApplyPluginsType.modify,
            initialValue: await this.configInstance.getDefaultConfig()
        });
        this.config = await this.applyPlugins({
            key: 'modifyConfig',
            type: this.ApplyPluginsType.modify,
            initialValue: this.configInstance.getConfig({
                defaultConfig
            })
        });
    }

    async initPresetsAndPlugins() {
        this.setStage(ServiceStage.initPresets);
        this._extraPlugins = [];
        while (this.initialPresets.length) {
            // eslint-disable-next-line
            await this.initPreset(this.initialPresets.shift());
        }

        this.setStage(ServiceStage.initPlugins);
        this._extraPlugins.push(...this.initialPlugins);
        while (this._extraPlugins.length) {
            // eslint-disable-next-line
            await this.initPlugin(this._extraPlugins.shift());
        }
    }

    getPluginAPI(opts) {
        const pluginAPI = new PluginAPI(opts);

        // register built-in methods
        [
            'onPluginReady',
            'modifyPaths',
            'onStart',
            'modifyDefaultConfig',
            'modifyConfig'
        ].forEach((name) => {
            pluginAPI.registerMethod({
                name,
                exitsError: false
            });
        });

        return new Proxy(pluginAPI, {
            get: (target, prop) => {
                // 由于 pluginMethods 需要在 register 阶段可用
                // 必须通过 proxy 的方式动态获取最新，以实现边注册边使用的效果
                if (this.pluginMethods[prop]) return this.pluginMethods[prop];
                if (
                    [
                        'applyPlugins',
                        'ApplyPluginsType',
                        'EnableBy',
                        'ConfigChangeType',
                        'babelRegister',
                        'stage',
                        'ServiceStage',
                        'paths',
                        'cwd',
                        'pkg',
                        'userConfig',
                        'config',
                        'env',
                        'args',
                        'hasPlugins',
                        'hasPresets',
                        'setConfig'
                    ].includes(prop)
                ) {
                    return typeof this[prop] === 'function'
                        ? this[prop].bind(this)
                        : this[prop];
                }
                return target[prop];
            }
        });
    }

    async applyAPI(opts) {
        let ret = opts.apply()(opts.api);
        if (isPromise(ret)) {
            ret = await ret;
        }
        return ret || {};
    }

    async initPreset(preset) {
        const { id, key, apply } = preset;
        preset.isPreset = true;

        const api = this.getPluginAPI({ id, key, service: this });

        // register before apply
        this.registerPlugin(preset);
        const { presets, plugins } = await this.applyAPI({
            api,
            apply
        });

        // register extra presets and plugins
        if (presets) {
            assert(
                Array.isArray(presets),
                `presets returned from preset ${id} must be Array.`
            );
            // 插到最前面，下个 while 循环优先执行
            this._extraPresets.splice(
                0,
                0,
                ...presets.map(path => pathToObj({
                    type: PluginType.preset,
                    path,
                    cwd: this.cwd
                }))
            );
        }

        // 深度优先
        const extraPresets = lodash.clone(this._extraPresets);
        this._extraPresets = [];
        while (extraPresets.length) {
            // eslint-disable-next-line
            await this.initPreset(extraPresets.shift());
        }

        if (plugins) {
            assert(
                Array.isArray(plugins),
                `plugins returned from preset ${id} must be Array.`
            );
            this._extraPlugins.push(
                ...plugins.map(path => pathToObj({
                    type: PluginType.plugin,
                    path,
                    cwd: this.cwd
                }))
            );
        }
    }


    async initPlugin(plugin) {
        const { id, key, apply } = plugin;

        const api = this.getPluginAPI({
            id,
            key,
            service: this
        });

        // register before apply
        this.registerPlugin(plugin);
        await this.applyAPI({
            api,
            apply
        });
    }

    getPluginOptsWithKey(key) {
        return getUserConfigWithKey({
            key,
            userConfig: this.userConfig
        });
    }

    registerPlugin(plugin) {
        this.plugins[plugin.id] = plugin;
    }

    isPluginEnable(pluginId) {
        // api.skipPlugins() 的插件
        if (this.skipPluginIds.has(pluginId)) return false;

        const { key, enableBy } = this.plugins[pluginId];

        // 手动设置为 false
        if (this.userConfig[key] === false) return false;

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

    hasPresets(presetIds) {
        return presetIds.every((presetId) => {
            const preset = this.plugins[presetId];
            return preset && preset.isPreset && this.isPluginEnable(presetId);
        });
    }

    hasPlugins(pluginIds) {
        return pluginIds.every((pluginId) => {
            const plugin = this.plugins[pluginId];
            return plugin && !plugin.isPreset && this.isPluginEnable(pluginId);
        });
    }

    async applyPlugins(opts) {
        const hooks = this.hooks[opts.key] || [];
        switch (opts.type) {
            case ApplyPluginsType.add:
                if ('initialValue' in opts) {
                    assert(
                        Array.isArray(opts.initialValue),
                        'applyPlugins failed, opts.initialValue must be Array if opts.type is add.'
                    );
                }
                // eslint-disable-next-line
                const tAdd = new AsyncSeriesWaterfallHook(["memo"]);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId)) {
                        continue;
                    }
                    tAdd.tapPromise(
                        {
                            name: hook.pluginId,
                            stage: hook.stage || 0,
                            // @ts-ignore
                            before: hook.before
                        },
                        async (memo) => {
                            const items = await hook.fn(opts.args);
                            return memo.concat(items);
                        }
                    );
                }
                return tAdd.promise(opts.initialValue || []);
            case ApplyPluginsType.modify:
                // eslint-disable-next-line
                const tModify = new AsyncSeriesWaterfallHook(["memo"]);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId)) {
                        continue;
                    }
                    tModify.tapPromise(
                        {
                            name: hook.pluginId,
                            stage: hook.stage || 0,
                            // @ts-ignore
                            before: hook.before
                        },
                        async memo => hook.fn(memo, opts.args)
                    );
                }
                return tModify.promise(opts.initialValue);
            case ApplyPluginsType.event:
                // eslint-disable-next-line
                const tEvent = new AsyncSeriesWaterfallHook(["_"]);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId)) {
                        continue;
                    }
                    tEvent.tapPromise(
                        {
                            name: hook.pluginId,
                            stage: hook.stage || 0,
                            // @ts-ignore
                            before: hook.before
                        },
                        async () => {
                            await hook.fn(opts.args);
                        }
                    );
                }
                return tEvent.promise();
            default:
                throw new Error(
                    `applyPlugin failed, type is not defined or is not matched, got ${opts.type}.`
                );
        }
    }

    initCommand() {
        this.program
            .usage('<command> [options]')
            .version(`@webank/fes ${this.fesPkg.version}`, '-v, --vers', 'output the current version')
            .description(chalk.cyan('一个好用的前端应用解决方案'));
    }

    parseCommand() {
        this.program.on('--help', () => {
            console.log();
            console.log(
                `  Run ${chalk.cyan(
                    'fes <command> --help'
                )} for detailed usage of given command.`
            );
            console.log();
        });
        this.program.commands.forEach(c => c.on('--help', () => console.log()));
        this.program.parse(process.argv);
    }

    async run({ rawArgv = {}, args = {} }) {
        await this.init();

        this.setStage(ServiceStage.run);
        await this.applyPlugins({
            key: 'onStart',
            type: ApplyPluginsType.event,
            args: {
                args
            }
        });

        this.runCommand({ rawArgv, args });
    }

    async runCommand({ rawArgv = {}, args = {} }) {
        assert(this.stage >= ServiceStage.init, 'service is not initialized.');

        Object.keys(this.commands).forEach((command) => {
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
                    await commandOptionConfig.fn({
                        rawArgv, args, options: c.opts(), program
                    });
                });
            }
        });

        this.parseCommand();
    }
}
