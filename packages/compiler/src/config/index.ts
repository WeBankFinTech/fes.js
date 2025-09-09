import type { ServiceInstance, UserConfig } from '../types';
import assert from 'node:assert';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { chalk, chokidar, compatESModuleRequire, deepmerge, lodash, winPath } from '@fesjs/utils';
import joi from 'joi';
import { ServiceStage } from '../service/enums';
import { getUserConfigWithKey, updateUserConfigWithKey } from './utils/configUtils';
import isEqual from './utils/isEqual';
import mergeDefault from './utils/mergeDefault';

interface ConfigOptions {
    cwd?: string;
    service: ServiceInstance;
    localConfig?: boolean;
}

interface WatchOptions {
    userConfig: UserConfig;
    onChange: (params: {
        userConfig: UserConfig;
        pluginChanged: Array<{ key: string; pluginId: string }>;
        valueChanged: Array<{ key: string; pluginId: string }>;
    }) => void;
}

const CONFIG_FILES: string[] = ['.fes.js'];

export default class Config {
    cwd: string;

    service: ServiceInstance;

    config: any;

    localConfig: boolean;

    configFile: string[];

    constructor(opts: ConfigOptions) {
        this.cwd = opts.cwd || process.cwd();
        this.service = opts.service;
        this.localConfig = opts.localConfig || false;
        this.configFile = [];
        this.config = null;
    }

    async getDefaultConfig(): Promise<Record<string, any>> {
        const pluginIds = Object.keys(this.service.plugins);

        // collect default config
        const defaultConfig = pluginIds.reduce((memo: Record<string, any>, pluginId: string) => {
            const { key, config = {} } = this.service.plugins[pluginId];
            if ('default' in config) {
                memo[key] = config.default;
            }
            return memo;
        }, {});

        return defaultConfig;
    }

    async getConfig(defaultConfig: Record<string, any>): Promise<UserConfig> {
        assert(this.service.stage >= ServiceStage.pluginReady, 'Config.getConfig() failed, it should not be executed before plugin is ready.');

        const userConfig = await this.getUserConfig();
        // 用于提示用户哪些 key 是未定义的
        // TODO: 考虑不排除 false 的 key
        const userConfigKeys = Object.keys(userConfig).filter(key => userConfig[key] !== false);

        // get config
        const pluginIds = Object.keys(this.service.plugins);
        pluginIds.forEach((pluginId: string) => {
            const { key, config = {} } = this.service.plugins[pluginId];
            // recognize as key if have schema config
            if (!config.schema) {
                return;
            }

            const value = getUserConfigWithKey({
                key,
                userConfig,
            });
            // 不校验 false 的值，此时已禁用插件
            if (value === false) {
                return;
            }

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

    async getUserConfig(): Promise<UserConfig> {
        const configFile = this.getConfigFile();
        this.configFile = configFile;
        if (configFile.length > 0) {
            const configs = await this.requireConfigs(configFile);
            return this.mergeConfig(configs);
        }
        return {};
    }

    addAffix(file: string, affix: string): string {
        const ext = extname(file);
        return file.replace(new RegExp(`${ext}$`), `.${affix}${ext}`);
    }

    async requireConfigs(configFiles: string[]): Promise<any[]> {
        const models = await Promise.all(configFiles.map((f) => {
            // 使用 pathToFileURL 确保在 Windows 下路径格式正确
            const fileUrl = pathToFileURL(f).href;
            // 避免命中模块缓存
            return import(`${fileUrl}?t=${Date.now()}`);
        }));
        return models.map(m => compatESModuleRequire(m));
    }

    mergeConfig(configs: any[]): UserConfig {
        let ret: UserConfig = {};
        for (const config of configs) {
            // TODO: 精细化处理，比如处理 dotted config key
            ret = deepmerge(ret, config);
        }
        return ret;
    }

    getConfigFile(): string[] {
        // TODO: support custom config file
        let configFile = CONFIG_FILES.find(f => existsSync(join(this.cwd, f)));
        if (!configFile) {
            return [];
        }
        configFile = winPath(configFile);
        let envConfigFile: string | undefined;
        // 潜在问题：
        // .local 和 .env 的配置必须有 configFile 才有效
        if (process.env.FES_ENV) {
            envConfigFile = this.addAffix(configFile, process.env.FES_ENV);
            if (!existsSync(join(this.cwd, envConfigFile))) {
                throw new Error(`get user config failed, ${envConfigFile} does not exist, but process.env.FES_ENV is set to ${process.env.FES_ENV}.`);
            }
        }
        const files = [configFile, envConfigFile, this.localConfig && this.addAffix(configFile, 'local')]
            .filter(f => !!f)
            .map(f => join(this.cwd, f as string))
            .filter(f => existsSync(f));
        return files as string[];
    }

    getWatchFilesAndDirectories(): string[] {
        const fesEnv = process.env.FES_ENV;
        const configFiles = lodash.clone(CONFIG_FILES);
        CONFIG_FILES.forEach((f) => {
            if (this.localConfig) {
                configFiles.push(this.addAffix(f, 'local'));
            }
            if (fesEnv) {
                configFiles.push(this.addAffix(f, fesEnv as string));
            }
        });

        const configDir = winPath(join(this.cwd, 'config'));

        const files = configFiles
            .reduce((memo: string[], f: string) => {
                const file = winPath(join(this.cwd, f));
                memo.push(file);
                return memo;
            }, [])
            .filter(f => !f.startsWith(configDir));

        return [configDir].concat(files);
    }

    watch(opts: WatchOptions): () => void {
        let paths = this.getWatchFilesAndDirectories();
        let userConfig = opts.userConfig;
        const watcher = chokidar.watch(paths, {
            ignoreInitial: true,
            cwd: this.cwd,
        });
        watcher.on('all', async (event, path) => {
            // eslint-disable-next-line no-console
            console.log(chalk.green(`[${event}] ${path}`));
            const newPaths = this.getWatchFilesAndDirectories();
            const diffs = lodash.difference(newPaths, paths);
            if (diffs.length) {
                watcher.add(diffs);
                paths = paths.concat(diffs);
            }

            const newUserConfig = await this.getUserConfig();
            const pluginChanged: Array<{ key: string; pluginId: string }> = [];
            const valueChanged: Array<{ key: string; pluginId: string }> = [];
            Object.keys(this.service.plugins).forEach((pluginId: string) => {
                const { key, config = {} } = this.service.plugins[pluginId];
                // recognize as key if have schema config
                if (!config.schema) {
                    return;
                }
                if (!isEqual(newUserConfig[key], userConfig[key])) {
                    const changed = {
                        key,
                        pluginId,
                    };
                    if (newUserConfig[key] === false || userConfig[key] === false) {
                        pluginChanged.push(changed);
                    }
                    else {
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
