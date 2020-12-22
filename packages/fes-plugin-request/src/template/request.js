import axios from 'axios';

// import { debounce } from 'throttle-debounce';
import { ApplyPluginsType, plugin, router } from '@webank/fes';
import {
    checkHttpRequestHasBody,
    trimObj,
    isFunction,
    isObject
} from './helpers';

/**
 * 统一错误处理
 * @param {object | string ｜ function} errorStruct
 * {
 *  errorMessage: '', // 错误地址
 *  errorPage: '', // 错误页面地址
 * }
 */
function _errorHandler(error, customerErrorHandler) {
    if (isFunction(error)) {
        error();
    } else if (error.errorPage) {
        router.replace(error.errorPage);
    } else {
        customerErrorHandler && customerErrorHandler(error);
    }
}

function addInterceptors(instance, interceptors, type = 'request') {
    interceptors.forEach((fn) => {
        if (Array.isArray(fn)) {
            instance.interceptors[type].use(...fn);
        } else if (isFunction(fn)) {
            instance.interceptors[type].use(fn);
        }
    });
}

function addRequestInterceptors(instance, interceptors) {
    addInterceptors(instance, interceptors, 'request');
}

function addResponseInterceptors(instance, interceptors) {
    addInterceptors(instance, interceptors, 'response');
}

function getRequestInstance() {
    const {
        responseDataAdaptor,
        errorConfig,
        requestInterceptors,
        responseInterceptors,
        errorHandler,
        ...otherConfigs
    } = plugin.applyPlugins({
        key: 'request',
        type: ApplyPluginsType.modify,
        initialValue: {}
    });

    const _errorConfig = Object.assign({
        401: {
            showType: 9,
            errorPage: '/login'
        },
        403: '用户得到授权，但访问是禁止的'
    }, errorConfig);

    const _requestInterceptors = [].concat([
        (config) => {
            config.method = config.method.toUpperCase();
            return config;
        },
        (config) => {
            if (checkHttpRequestHasBody(config.method)) {
                config.data = trimObj(config.data);
            } else {
                config.params = trimObj(config.params);
            }
            return config;
        }
    ], requestInterceptors);

    const _responseInterceptors = [].concat([
        [
            function (response) {
                if (isObject(response.data) && response.data.code !== '0') {
                    _errorHandler(_errorConfig[response.data.code] || response.data.msg || response.data.errorMessage || response.data.errorMsg || '服务异常', errorHandler);
                    return Promise.reject(response);
                }

                return response;
            }, function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (_errorConfig[error.response.status]) {
                        _errorHandler(_errorConfig[error.response.status], errorHandler);
                    }
                }
                return Promise.reject(error);
            }
        ]
    ], responseInterceptors);
    if (responseDataAdaptor && isFunction(responseDataAdaptor)) {
        _responseInterceptors.unshift((response) => {
            // 响应内容可能是个文件流 or 普通文本
            if (isObject(response.data)) {
                response.data = responseDataAdaptor(response.data);
            }
            return response;
        });
    }
    // 只把响应数据暴露出去
    _responseInterceptors.push((response) => {
        // eslint-disable-next-line
        const dataField = REPLACE_DATA_FIELD;
        if (isObject(response.data) && dataField) {
            return response.data[dataField];
        }
        return response;
    });

    const instance = axios.create(Object.assign({
        timeout: 10000,
        withCredentials: true
    }, otherConfigs));

    addRequestInterceptors(instance, _requestInterceptors);
    addResponseInterceptors(instance, _responseInterceptors);

    return {
        instance
    };
}

// TODO 待实现能力
// formData 控制
// 轮询
// 并行请求 >> 通过定义 key 区分
// 防抖 & 节流
// 缓存 & SWR & 预加载
// loadingDelay

let currentRequestInstance = null;
export const request = (url, data, options = {}) => {
    if (!currentRequestInstance) {
        const { instance } = getRequestInstance();
        currentRequestInstance = instance;
    }
    options.url = url;
    options.method = options.method || 'post';
    if (checkHttpRequestHasBody(options.method)) {
        options.data = data;
    } else {
        options.params = data;
    }
    return currentRequestInstance.request(options);
};
