import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Ref } from 'vue';

type RequestInterceptor = (value: AxiosRequestConfig) => AxiosRequestConfig | [(value: AxiosRequestConfig) => AxiosRequestConfig, (error: any) => any];
type ResponseInterceptor = (value: AxiosResponse) => AxiosResponse | [(value: AxiosResponse) => AxiosResponse, (error: any) => any];

export type RequestResponse = AxiosResponse;
export type RequestError = AxiosError & { type: string; msg: string; [key: string]: any };
interface RequestPluginOption {
    mergeRequest?: boolean;
    dataHandler?(data: any, response: AxiosResponse): any;
    errorHandler?(error: RequestError): void;
    cache?:
        | boolean
        | {
              cacheType?: 'ram' | 'sessionStorage' | 'localStorage';
              cacheTime?: number;
          };
}

export type RequestOptions = AxiosRequestConfig & RequestPluginOption;

export function request(url: string, data?: null | Record<string, any>, options?: (AxiosRequestConfig & RequestPluginOption) | string): Promise<any>;
export function useRequest(
    url: string,
    data?: null | Record<string, any>,
    options?: AxiosRequestConfig & RequestPluginOption,
): { loadingRef: Ref<boolean>; errorRef: Ref<Error>; dataRef: Ref<any> };

declare module '@fesjs/fes' {
    interface PluginRuntimeConfig {
        request?: {
            dataHandler?(data: any, response: AxiosResponse): any;
            errorHandler?(error: RequestError): void;
            requestInterceptors?: RequestInterceptor[];
            responseInterceptors?: ResponseInterceptor[];
        } & AxiosRequestConfig;
    }
}
