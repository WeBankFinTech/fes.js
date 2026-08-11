/**
 * 插件类型枚举
 */
export enum PluginType {
    preset = 'preset',
    plugin = 'plugin',
    builder = 'builder',
}

/**
 * 服务阶段枚举
 */
export enum ServiceStage {
    uninitialized = 0,
    constructor = 1,
    init = 2,
    initPresets = 3,
    initPlugins = 4,
    initHooks = 5,
    pluginReady = 6,
    getConfig = 7,
    getPaths = 8,
    run = 9,
}

/**
 * 配置变更类型枚举
 */
export enum ConfigChangeType {
    reload = 'reload',
    regenerateTmpFiles = 'regenerateTmpFiles',
}

/**
 * 应用插件类型枚举
 */
export enum ApplyPluginsType {
    add = 'add',
    modify = 'modify',
    event = 'event',
}

/**
 * 启用方式枚举
 */
export enum EnableBy {
    register = 'register',
    config = 'config',
}
