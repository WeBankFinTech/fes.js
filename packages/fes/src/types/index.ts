// CLI 相关类型
export interface CliArgs {
    _: (string | number)[];
    [key: string]: any;
}

// Service 相关类型
export interface ServiceWithBuiltInOptions {
    cwd?: string;
    pkg?: Record<string, any>;
    env?: string;
    fesPkg?: Record<string, any>;
    presets?: string[];
    plugins?: string[];
}

// Fork 相关类型
export interface ForkOptions {
    scriptPath: string;
}

export interface MessageData {
    type?: string;
    port?: number;
    [key: string]: any;
}

// 开发相关类型
export interface DevArgs {
    [key: string]: any;
}
