import type { Config, ParamsType } from '@qlin/request/dist/interface';
import { Ref } from 'vue';

export * from '@qlin/request';

export function request(url: string, data?: ParamsType | null, options?: Partial<Config>): Promise<any>;
export function rawRequest(url: string, data?: ParamsType | null, options?: Partial<Config>): Promise<any>;
export function useRequest(
    url: string,
    data?: null | ParamsType,
    options?: Partial<Config>,
): { loadingRef: Ref<boolean>; errorRef: Ref<Error>; dataRef: Ref<any> };

declare module '@fesjs/fes' {
    interface PluginRuntimeConfig {
        request?: Partial<Config>;
    }
}
