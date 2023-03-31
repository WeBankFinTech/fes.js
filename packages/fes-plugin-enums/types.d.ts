import '@fesjs/fes';

interface EnumExtend {
    key: string;
    dir: string;
    transfer<T>(data: T): T;
}

interface EnumApi {
    get(name: string, key?: string, extend?: EnumExtend): any;
    push(name: string, _enum?: [] | object, option?: { keyName: string; valueName: string }): any;
    remove(name: string): void;
    concat(name: string, _enum: [] | object, option?: { keyName: string; valueName: string; before: boolean; extend: EnumExtend }): any;
    convert(name: string, _enum?: [] | object, option?: { keyName: string; valueName: string }): any;
}

export const enums: EnumApi;
declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        enums?: {
            [key: string]: [string | number, string | number][];
        } | false;
    }
}
