import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestBuildConfig {
    request: {
        dataField: string
    }
}


type RequestInterceptor = (value: AxiosRequestConfig) => AxiosRequestConfig | [(value: AxiosRequestConfig) => AxiosRequestConfig, (error: any) => any];
type ResponseInterceptor = (value: AxiosResponse) => AxiosResponse | [(value: AxiosResponse) => AxiosResponse, (error: any) => any];


export interface RequestRuntimeConfig {
    request: {
        responseDataAdaptor?<T>(data: T): T;
        closeResDataCheck?: boolean;
        requestInterceptors?: RequestInterceptor[];
        responseInterceptors?: ResponseInterceptor[];
        errorHandler: {
            [key: string]: (error: { response: AxiosResponse } | AxiosResponse) => void;
        };
    } & AxiosRequestConfig;
}