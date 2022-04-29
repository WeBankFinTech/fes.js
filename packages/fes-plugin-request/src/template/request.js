import axios from 'AXIOS_PATH';
import { ApplyPluginsType, plugin } from '@fesjs/fes';
import { ref } from 'vue';
import scheduler from './scheduler';
import {
    checkHttpRequestHasBody,
    isFunction
} from './helpers';

import setDataField from './setDataField';
import paramsProcess from './paramsProcess';
import genRequestKey from './genRequestKey';
import preventRepeatReq from './preventRepeatReq';
import throttle from './throttle';
import cacheControl from './cacheControl';
import resDataAdaptor from './resDataAdaptor';
import resErrorProcess from './resErrorProcess';

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

async function axiosMiddleware(context, next) {
    try {
        context.response = await context.instance.request(context.config);
    } catch (error) {
        context.error = error;
    }
    await next();
}

function getRequestInstance() {
    const {
        responseDataAdaptor,
        requestInterceptors = [],
        responseInterceptors = [],
        errorHandler,
        ...otherConfigs
    } = plugin.applyPlugins({
        key: 'request',
        type: ApplyPluginsType.modify,
        initialValue: {}
    });

    const defaultConfig = Object.assign({
        timeout: 10000,
        withCredentials: true
    }, otherConfigs);
    const instance = axios.create(defaultConfig);

    addRequestInterceptors(instance, requestInterceptors);
    addResponseInterceptors(instance, responseInterceptors);

    // 洋葱模型内部应该这是对数据的处理，避免有副作用调用
    scheduler
        .use(paramsProcess)
        .use(genRequestKey)
        .use(cacheControl)
        .use(preventRepeatReq)
        .use(throttle)
        .use(axiosMiddleware)
        .use(resDataAdaptor)
        .use(resErrorProcess)
        .use(setDataField);

    return {
        context: {
            instance,
            defaultConfig,
            dataField: REPLACE_DATA_FIELD, // eslint-disable-line
            responseDataAdaptor,
            errorHandler
        },
        request: scheduler.compose()
    };
}

// DEPRECATED 废弃，使用 axios baseURL
function handleApiPathBase(url, options = {}) {
    if (url.startsWith('http')) return url;

    if (options.base) {
        return `${options.base}${url}`;
    }
    return `REPLACE_BASE${url}`;
}

function userConfigHandler(url, data, options = {}) {
    options.url = handleApiPathBase(url, options);
    options.method = (options.method || 'post').toUpperCase();
    if (checkHttpRequestHasBody(options.method)) {
        options.data = data;
    } else {
        options.params = data;
    }
    return options;
}

let currentRequestInstance = null;

function createContext(userConfig) {
    return {
        ...currentRequestInstance.context,
        config: {
            ...currentRequestInstance.context.defaultConfig,
            ...userConfig
        }
    };
}


function getResponseCode(response) {
    if (response) {
        if (response._rawData) return response._rawData.code;
        if (response.data) return response.data.code;
    }
    return null;
}

function skipErrorHandlerToObj(skipErrorHandler = []) {
    if (!Array.isArray(skipErrorHandler)) {
        skipErrorHandler = [skipErrorHandler];
    }

    return skipErrorHandler.reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
    }, {});
}

function getErrorKey(error, response) {
    const resCode = getResponseCode(response);

    if (resCode) return resCode;
    if (error.type) return error.type;
    return error.response?.status;
}

function isSkipErrorHandler(config, errorKey) {
    // 跳过所有错误类型处理
    if (config.skipErrorHandler === true) return true;

    const skipObj = skipErrorHandlerToObj(config.skipErrorHandler);

    return skipObj[errorKey];
}

function handleRequestError({
    errorHandler = {},
    error,
    response,
    config
}) {
    const errorKey = getErrorKey(error, response);

    if (!isSkipErrorHandler(config, errorKey)) {
        if (isFunction(errorHandler[errorKey])) {
            errorHandler[errorKey](error, response);
        } else if (isFunction(errorHandler.default)) {
            errorHandler.default(error, response);
        }
    }
}

export const request = (url, data, options = {}) => {
    if (typeof options === 'string') {
        options = {
            method: options
        };
    }
    if (!currentRequestInstance) {
        currentRequestInstance = getRequestInstance();
    }
    const userConfig = userConfigHandler(url, data, options);
    const context = createContext(userConfig);

    return currentRequestInstance.request(context).then(async () => {
        if (!context.error) {
            return context.config.useResponse ? context.response : context.response.data;
        }
        await handleRequestError(context);
        return Promise.reject(context.error);
    });
};

function isPromiseLike(obj) {
    return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
}

export const useRequest = (url, data, options = {}) => {
    const loadingRef = ref(true);
    const errorRef = ref(null);
    const dataRef = ref(null);
    let promise;
    if (isPromiseLike(url)) {
        promise = url;
    } else {
        promise = request(url, data, options);
    }
    promise.then((res) => {
        dataRef.value = res;
    }).catch((error) => {
        errorRef.value = error;
    }).finally(() => {
        loadingRef.value = false;
    });
    return {
        loading: loadingRef,
        error: errorRef,
        data: dataRef
    };
};
