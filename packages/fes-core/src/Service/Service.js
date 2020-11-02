import {
    join
} from 'path';
import {
    EventEmitter
} from 'events';
import assert from 'assert';
import {
    AsyncSeriesWaterfallHook
} from 'tapable';
import {
    existsSync
} from 'fs';
import { BabelRegister } from '@umijs/utils';
import {
    resolvePlugins
} from './utils/pluginUtils';
import loadDotEnv from './utils/loadDotEnv';
import isPromise from './utils/isPromise';
import PluginAPI from './PluginAPI';
import {
    ApplyPluginsType,
    ConfigChangeType,
    EnableBy,
    ServiceStage
} from './enums';
import Config from '../Config/Config';
import {
    getUserConfigWithKey
} from '../Config/utils/configUtils';
import getPaths from './getPaths';

// TODO
// 1. duplicated key
// 2. Logger
// 3. 支持插件集?
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

    // initial plugins from arguments, config, process.env, and package.json
    initialPlugins = [];

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

        // setup initial plugins
        const baseOpts = {
            pkg: this.pkg,
            cwd: this.cwd
        };
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
            return require(join(this.cwd, 'package.json'));
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
        // we should have the final hooksByPluginId which is added with api.register()
        await this.initPlugins();

        // hooksByPluginId -> hooks
        // hooks is mapped with hook key, prepared for applyPlugins()
        this.setStage(ServiceStage.initHooks);
        Object.keys(this.hooksByPluginId).forEach((id) => {
            const hooks = this.hooksByPluginId[id];
            hooks.forEach((hook) => {
                const {
                    key
                } = hook;
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

        // merge paths to keep the this.paths ref
        this.setStage(ServiceStage.getPaths);
        // config.outputPath may be modified by plugins
        if (this.config.outputPath) {
            this.paths.absOutputPath = join(this.cwd, this.config.outputPath);
        }
        const paths = (await this.applyPlugins({
            key: 'modifyPaths',
            type: ApplyPluginsType.modify,
            initialValue: this.paths
        }));
        Object.keys(paths).forEach((key) => {
            this.paths[key] = paths[key];
        });
    }

    async initPlugins() {
        this._extraPlugins = [];
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
                        'hasPlugins'
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

    async initPlugin(plugin) {
        const {
            id,
            key,
            apply
        } = plugin;

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

        const {
            key,
            enableBy
        } = this.plugins[pluginId];

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

    hasPlugins(pluginIds) {
        return pluginIds.every((pluginId) => {
            const plugin = this.plugins[pluginId];
            return plugin && this.isPluginEnable(pluginId);
        });
    }

    async applyPlugins(opts) {
        const hooks = this.hooks[opts.key] || [];
        switch (opts.type) {
            case ApplyPluginsType.add:
                if ('initialValue' in opts) {
                    assert(
                        Array.isArray(opts.initialValue),
                        'applyPlugins failed, opts.initialValue must be Array if opts.type is add.',
                    );
                }
                // eslint-disable-next-line
                const tAdd = new AsyncSeriesWaterfallHook(['memo']);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId)) {
                        continue;
                    }
                    tAdd.tapPromise({
                        name: hook.pluginId,
                        stage: hook.stage || 0,
                        // @ts-ignore
                        before: hook.before
                    },
                    async (memo) => {
                        const items = await hook.fn(opts.args);
                        return memo.concat(items);
                    },);
                }
                return tAdd.promise(opts.initialValue || []);
            case ApplyPluginsType.modify:
                // eslint-disable-next-line
                const tModify = new AsyncSeriesWaterfallHook(['memo']);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId)) {
                        continue;
                    }
                    tModify.tapPromise({
                        name: hook.pluginId,
                        stage: hook.stage || 0,
                        // @ts-ignore
                        before: hook.before
                    },
                    async memo => hook.fn(memo, opts.args),);
                }
                return tModify.promise(opts.initialValue);
            case ApplyPluginsType.event:
                // eslint-disable-next-line
                const tEvent = new AsyncSeriesWaterfallHook(['_']);
                for (const hook of hooks) {
                    if (!this.isPluginEnable(hook.pluginId)) {
                        continue;
                    }
                    tEvent.tapPromise({
                        name: hook.pluginId,
                        stage: hook.stage || 0,
                        // @ts-ignore
                        before: hook.before
                    },
                    async () => {
                        await hook.fn(opts.args);
                    },);
                }
                return tEvent.promise();
            default:
                throw new Error(
                    `applyPlugin failed, type is not defined or is not matched, got ${opts.type}.`,
                );
        }
    }

    async run({
        name,
        args = {}
    }) {
        args._ = args._ || [];
        // shift the command itself
        if (args._[0] === name) args._.shift();

        this.args = args;
        await this.init();

        // TODO 临时实现
        await this.applyPlugins({
            key: 'onGenerateFiles',
            type: ApplyPluginsType.event
        });


        this.setStage(ServiceStage.run);
        await this.applyPlugins({
            key: 'onStart',
            type: ApplyPluginsType.event,
            args: {
                args
            }
        });
        // TODO 执行命令
        // return this.runCommand({
        //     name,
        //     args
        // });
    }

    async runCommand({
        name,
        args = {}
    }) {
        assert(this.stage >= ServiceStage.init, 'service is not initialized.');

        args._ = args._ || [];
        // shift the command itself
        if (args._[0] === name) args._.shift();

        const command = typeof this.commands[name] === 'string'
            ? this.commands[this.commands[name]]
            : this.commands[name];
        assert(command, `run command failed, command ${name} does not exists.`);

        const {
            fn
        } = command;
        return fn({
            args
        });
    }
}
