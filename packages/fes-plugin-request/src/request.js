import axios from 'axios';
import reqInterceptors from './reqInterceptors';
import resInterceptors from './resInterceptors';
import { checkHttpRequestHasBody, isObject } from './helpers';

// TODO
// 响应体控制
// formData 控制
// 段时间内不能重复发送的请求
// 错误控制
// 跳错误页面 || 或者重新登录

let instance;

export function requestUse(before, error) {
    return this.instance.interceptors.request.use(before, error);
}

export function requestEject(interceptor) {
    this.instance.interceptors.request.eject(interceptor);
}

export function responseUse(after, error) {
    return instance.interceptors.response.use(after, error);
}

export function responseEject(interceptor) {
    instance.interceptors.response.eject(interceptor);
}

export function getRequestInstance() {
    return instance;
}

function _failedHandler(error, customerErrorHandler) {
    if (error.response) {
        const status = error.response.status;
        if (typeof customerErrorHandler[status] === 'function') {
            customerErrorHandler(error);
        }
    } else if (error.request) {
        // TODO 请求异常
    } else {
        console.error(error);
    }
    return Promise.reject(error);
}

function _successedHandler(response, responseDataStruct) {
    const responseData = response.data;
    if (responseDataStruct && isObject(responseData)) {
        // TODO 响应体解构解析
        return responseData;
    }
    return responseData;
}

function initAxiosInstance({ options: internalOptions, responseDataStruct, errorHandler }) {
    const customerErrorHandler = errorHandler || {};

    instance = axios.create(Object.assign({
        timeout: 10000,
        withCredentials: true
    }, internalOptions));

    // 设置请求拦截器
    reqInterceptors(instance);

    // 设置响应拦截器
    resInterceptors(instance);

    return (url, data, options = {}) => {
        options.url = url;
        options.method = options.method || 'post';
        if (checkHttpRequestHasBody(options.method)) {
            options.data = data;
        } else {
            options.params = data;
        }
        // 请求内容可能是一个json
        // 一个 query
        // formdata
        // 响应内容可能是一个文件流
        // 一个文本
        // 一个 json
        // eslint-disable-next-line
        return this.instance.request(options).then(response => _successedHandler(response, responseDataStruct)).catch(error => _failedHandler(error, customerErrorHandler));
    };
}

export default initAxiosInstance;
