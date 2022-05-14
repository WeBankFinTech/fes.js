/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/tree/master/packages/core
 */

import assert from 'assert';
import * as utils from '@fesjs/utils';
import { isValidPlugin, pathToObj } from './utils/pluginUtils';
import { EnableBy, PluginType, ServiceStage } from './enums';

// TODO
// 标准化 logger
export default class PluginAPI {
    constructor(opts) {
        this.id = opts.id;
        this.key = opts.key;
        this.service = opts.service;
        this.utils = utils;
        this.logger = utils.logger;
    }

    // TODO: reversed keys
    describe({ id, key, config, enableBy } = {}) {
        const { plugins } = this.service;
        // this.id and this.key is generated automatically
        // so we need to diff first
        if (id && this.id !== id) {
            if (plugins[id]) {
                const name = plugins[id].isPreset ? 'preset' : 'plugin';
                throw new Error(`api.describe() failed, ${name} ${id} is already registered by ${plugins[id].path}.`);
            }
            plugins[id] = plugins[this.id];
            plugins[id].id = id;
            delete plugins[this.id];
            this.id = id;
        }
        if (key && this.key !== key) {
            this.key = key;
            plugins[this.id].key = key;
        }

        if (config) {
            plugins[this.id].config = config;
        }

        plugins[this.id].enableBy = enableBy || EnableBy.register;
    }

    register(hook) {
        assert(hook.key && typeof hook.key === 'string', `api.register() failed, hook.key must supplied and should be string, but got ${hook.key}.`);
        assert(hook.fn && typeof hook.fn === 'function', `api.register() failed, hook.fn must supplied and should be function, but got ${hook.fn}.`);
        this.service.hooksByPluginId[this.id] = (this.service.hooksByPluginId[this.id] || []).concat(hook);
    }

    registerCommand(commandOption) {
        const { command, fn } = commandOption;
        assert(!this.service.commands[command], `api.registerCommand() failed, the command ${command} is exists.`);
        assert(typeof command === 'string', 'api.registerCommand() failed, the command must be string.');
        assert(typeof fn === 'function', 'api.registerCommand() failed, the fn must be function.');
        this.service.commands[command] = commandOption;
    }

    // 在 preset 初始化阶段放后面，在插件注册阶段放前面
    registerPlugins(plugins) {
        assert(
            this.service.stage === ServiceStage.initPresets || this.service.stage === ServiceStage.initPlugins,
            'api.registerPlugins() failed, it should only be used in registering stage.',
        );
        assert(Array.isArray(plugins), 'api.registerPlugins() failed, plugins must be Array.');
        const extraPlugins = plugins.map((plugin) =>
            isValidPlugin(plugin)
                ? plugin
                : pathToObj({
                      type: PluginType.plugin,
                      path: plugin,
                      cwd: this.service.cwd,
                  }),
        );
        if (this.service.stage === ServiceStage.initPresets) {
            this.service._extraPlugins.push(...extraPlugins);
        } else {
            this.service._extraPlugins.splice(0, 0, ...extraPlugins);
        }
    }

    registerPresets(presets) {
        assert(this.service.stage === ServiceStage.initPresets, 'api.registerPresets() failed, it should only used in presets.');
        assert(Array.isArray(presets), 'api.registerPresets() failed, presets must be Array.');
        const extraPresets = presets.map((preset) =>
            isValidPlugin(preset)
                ? preset
                : pathToObj({
                      type: PluginType.preset,
                      path: preset,
                      cwd: this.service.cwd,
                  }),
        );
        // 插到最前面，下个 while 循环优先执行
        this.service._extraPresets.splice(0, 0, ...extraPresets);
    }

    registerMethod({ name, fn, exitsError = true }) {
        if (this.service.pluginMethods[name]) {
            if (exitsError) {
                throw new Error(`api.registerMethod() failed, method ${name} is already exist.`);
            } else {
                return;
            }
        }
        this.service.pluginMethods[name] =
            fn ||
            // 这里不能用 arrow function，this 需指向执行此方法的 PluginAPI
            // 否则 pluginId 会不会，导致不能正确 skip plugin
            function (hookFn) {
                const hook = {
                    key: name,
                    ...(utils.lodash.isPlainObject(hookFn) ? hookFn : { fn: hookFn }),
                };
                // @ts-ignore
                this.register(hook);
            };
    }

    registerBuilder(builder) {
        assert(typeof builder === 'object', 'api.registerBuilder() failed, the builder must be object.');
        const { name } = builder;
        assert(typeof name === 'string', 'api.registerBuilder() failed, the builder.name must be string.');
        assert(typeof this.service.builder.name !== 'string', `检测到您使用了 builder: ${name}，已经加载 builder: ${this.service.builder.name}， 请保留一个`);
        this.service.builder = builder;
    }

    skipPlugins(pluginIds) {
        pluginIds.forEach((pluginId) => {
            this.service.skipPluginIds.add(pluginId);
        });
    }
}
