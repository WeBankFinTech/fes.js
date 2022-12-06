/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/tree/master/packages/core
 */

import { existsSync } from 'fs';
import { extname, join } from 'path';
import assert from 'assert';
import { chalk, chokidar, compatESModuleRequire, deepmerge, cleanRequireCache, lodash, parseRequireDeps, winPath } from '@fesjs/utils';
import joi from 'joi';
import { ServiceStage } from '../service/enums';
import { getUserConfigWithKey, updateUserConfigWithKey } from './utils/configUtils';
import isEqual from './utils/isEqual';
import mergeDefault from './utils/mergeDefault';

const CONFIG_FILES = ['.fes.js'];

export default class Config {
    cwd;

    service;

    config;

    localConfig;

    configFile;

    constructor(opts) {
        this.cwd = opts.cwd || process.cwd();
        this.service = opts.service;
        this.localConfig = opts.localConfig;
    }

    async getDefaultConfig() {
        const pluginIds = Object.keys(this.service.plugins);

        // collect default config
        const defaultConfig = pluginIds.reduce((memo, pluginId) => {
            const { key, config = {} } = this.service.plugins[pluginId];
            if ('default' in config) memo[key] = config.default;
            return memo;
        }, {});

        return defaultConfig;
    }

    getConfig({ defaultConfig }) {
        assert(this.service.stage >= ServiceStage.pluginReady, 'Config.getConfig() failed, it should not be executed before plugin is ready.');

        const userConfig = this.getUserConfig();
        // 用于提示用户哪些 key 是未定义的
        // TODO: 考虑不排除 false 的 key
        const userConfigKeys = Object.keys(userConfig).filter((key) => userConfig[key] !== false);

        // get config
        const pluginIds = Object.keys(this.service.plugins);
        pluginIds.forEach((pluginId) => {
            const { key, config = {} } = this.service.plugins[pluginId];
            // recognize as key if have schema config
            if (!config.schema) return;

            const value = getUserConfigWithKey({
                key,
                userConfig,
            });
            // 不校验 false 的值，此时已禁用插件
            if (value === false) return;

            // do validate
            const schema = config.schema(joi);
            assert(joi.isSchema(schema), `schema return from plugin ${pluginId} is not valid schema.`);
            const { error } = schema.validate(value);
            if (error) {
                const e = new Error(`Validate config "${key}" failed, ${error.message}`);
                e.stack = error.stack;
                throw e;
            }

            // remove key
            const index = userConfigKeys.indexOf(key.split('.')[0]);
            if (index !== -1) {
                userConfigKeys.splice(index, 1);
            }

            // update userConfig with defaultConfig
            if (key in defaultConfig) {
                const newValue = mergeDefault({
                    defaultConfig: defaultConfig[key],
                    config: value,
                });
                updateUserConfigWithKey({
                    key,
                    value: newValue,
                    userConfig,
                });
            }
        });

        if (userConfigKeys.length) {
            const keys = userConfigKeys.length > 1 ? 'keys' : 'key';
            throw new Error(`Invalid config ${keys}: ${userConfigKeys.join(', ')}`);
        }

        return userConfig;
    }

    getUserConfig() {
        const configFile = this.getConfigFile();
        this.configFile = configFile;
        if (configFile.length > 0) {
            // clear require cache and set babel register
            const requireDeps = configFile.reduce((memo, file) => {
                memo = memo.concat(parseRequireDeps(file));
                return memo;
            }, []);
            requireDeps.forEach(cleanRequireCache);
            this.service.babelRegister.setOnlyMap({
                key: 'config',
                value: requireDeps,
            });

            // require config and merge
            return this.mergeConfig(...this.requireConfigs(configFile));
        }
        return {};
    }

    addAffix(file, affix) {
        const ext = extname(file);
        return file.replace(new RegExp(`${ext}$`), `.${affix}${ext}`);
    }

    requireConfigs(configFiles) {
        // eslint-disable-next-line
        return configFiles.map((f) => compatESModuleRequire(require(f)));
    }

    mergeConfig(...configs) {
        let ret = {};
        for (const config of configs) {
            // TODO: 精细化处理，比如处理 dotted config key
            ret = deepmerge(ret, config);
        }
        return ret;
    }

    getConfigFile() {
        // TODO: support custom config file
        let configFile = CONFIG_FILES.find((f) => existsSync(join(this.cwd, f)));
        if (!configFile) return [];
        configFile = winPath(configFile);
        let envConfigFile;
        // 潜在问题：
        // .local 和 .env 的配置必须有 configFile 才有效
        if (process.env.FES_ENV) {
            envConfigFile = this.addAffix(configFile, process.env.FES_ENV);
            if (!existsSync(join(this.cwd, envConfigFile))) {
                throw new Error(`get user config failed, ${envConfigFile} does not exist, but process.env.FES_ENV is set to ${process.env.FES_ENV}.`);
            }
        }
        const files = [configFile, envConfigFile, this.localConfig && this.addAffix(configFile, 'local')]
            .filter((f) => !!f)
            .map((f) => join(this.cwd, f))
            .filter((f) => existsSync(f));
        return files;
    }

    getWatchFilesAndDirectories() {
        const fesEnv = process.env.FES_ENV;
        const configFiles = lodash.clone(CONFIG_FILES);
        CONFIG_FILES.forEach((f) => {
            if (this.localConfig) configFiles.push(this.addAffix(f, 'local'));
            if (fesEnv) configFiles.push(this.addAffix(f, fesEnv));
        });

        const configDir = winPath(join(this.cwd, 'config'));

        const files = configFiles
            .reduce((memo, f) => {
                const file = winPath(join(this.cwd, f));
                if (existsSync(file)) {
                    memo = memo.concat(parseRequireDeps(file));
                } else {
                    memo.push(file);
                }
                return memo;
            }, [])
            .filter((f) => !f.startsWith(configDir));

        return [configDir].concat(files);
    }

    watch(opts) {
        let paths = this.getWatchFilesAndDirectories();
        let userConfig = opts.userConfig;
        const watcher = chokidar.watch(paths, {
            ignoreInitial: true,
            cwd: this.cwd,
        });
        watcher.on('all', (event, path) => {
            console.log(chalk.green(`[${event}] ${path}`));
            const newPaths = this.getWatchFilesAndDirectories();
            const diffs = lodash.difference(newPaths, paths);
            if (diffs.length) {
                watcher.add(diffs);
                paths = paths.concat(diffs);
            }

            const newUserConfig = this.getUserConfig();
            const pluginChanged = [];
            const valueChanged = [];
            Object.keys(this.service.plugins).forEach((pluginId) => {
                const { key, config = {} } = this.service.plugins[pluginId];
                // recognize as key if have schema config
                if (!config.schema) return;
                if (!isEqual(newUserConfig[key], userConfig[key])) {
                    const changed = {
                        key,
                        pluginId,
                    };
                    if (newUserConfig[key] === false || userConfig[key] === false) {
                        pluginChanged.push(changed);
                    } else {
                        valueChanged.push(changed);
                    }
                }
            });

            if (pluginChanged.length || valueChanged.length) {
                opts.onChange({
                    userConfig: newUserConfig,
                    pluginChanged,
                    valueChanged,
                });
            }
            userConfig = newUserConfig;
        });

        return () => {
            watcher.close();
        };
    }
}
