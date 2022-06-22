import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {Ref} from 'vue';


type RequestInterceptor = (value: AxiosRequestConfig) => AxiosRequestConfig | [(value: AxiosRequestConfig) => AxiosRequestConfig, (error: any) => any];
type ResponseInterceptor = (value: AxiosResponse) => AxiosResponse | [(value: AxiosResponse) => AxiosResponse, (error: any) => any];

interface RequestPluginOption {
    mergeRequest: boolean;
    cache: boolean | {
        type: 'ram' | 'sessionStorage' | 'localStorage',
        cacheTime: number;
    }
}

declare module "@fesjs/fes" {
    interface PluginRuntimeConfig {
        request?: {
            dataHandler?(data: any, response: AxiosResponse): any;
            errorHandler?(error: AxiosError | {type: string, msg: string, [key: string]: string}): void;
            requestInterceptors?: RequestInterceptor[];
            responseInterceptors?: ResponseInterceptor[];
        } & AxiosRequestConfig;
    }
    export function request(url: string, data: null | Record<string, any>, options: AxiosRequestConfig & RequestPluginOption ): Promise<any>
    export function useRequest(url: string, data: null | Record<string, any>, options: AxiosRequestConfig & RequestPluginOption ): {loadingRef: Ref<boolean>; errorRef: Ref<Error>; dataRef: Ref<any>}
}