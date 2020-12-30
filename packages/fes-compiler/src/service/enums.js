export const PluginType = {
    preset: 'preset',
    plugin: 'plugin'
};

export const ServiceStage = {
    uninitialized: 0,
    constructor: 1,
    init: 2,
    initPlugins: 3,
    initHooks: 4,
    pluginReady: 5,
    getConfig: 6,
    getPaths: 7,
    run: 8
};

export const ConfigChangeType = {
    reload: 'reload',
    regenerateTmpFiles: 'regenerateTmpFiles'
};

export const ApplyPluginsType = {
    add: 'add',
    modify: 'modify',
    event: 'event'
};

export const EnableBy = {
    register: 'register',
    config: 'config'
};
