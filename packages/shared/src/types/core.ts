export interface Paths {
    tmpDir: string;
    cwd: string;
    absNodeModulesPath: string;
    absOutputPath: string;
    absSrcPath: string;
    absPagesPath: string;
    absTmpPath: string;
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
 * 配置变更类型枚举
 */
export enum ConfigChangeType {
    reload = 'reload',
    regenerateTmpFiles = 'regenerateTmpFiles',
}
