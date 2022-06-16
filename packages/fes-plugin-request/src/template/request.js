import axios from 'axios';
import { ApplyPluginsType, plugin } from '@fesjs/fes';
import { ref } from 'vue';
import scheduler from './scheduler';
import { checkHttpRequestHasBody, isFunction } from './helpers';

import paramsProcess from './paramsProcess';
import genRequestKey from './genRequestKey';
import preventRepeatReq from './preventRepeatReq';
import cacheControl from './cacheControl';

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
        dataHandler,
        errorHandler,
        requestInterceptors = [],
        responseInterceptors = [],
        ...otherConfigs
    } = plugin.applyPlugins({
        key: 'request',
        type: ApplyPluginsType.modify,
        initialValue: {},
    });

    const defaultConfig = Object.assign(
        {
            timeout: 10000,
            withCredentials: true,
        },
        otherConfigs,
    );
    const instance = axios.create(defaultConfig);

    addRequestInterceptors(instance, requestInterceptors);
    addResponseInterceptors(instance, responseInterceptors);

    // 洋葱模型内部应该这是对数据的处理，避免有副作用调用
    scheduler.use(paramsProcess).use(genRequestKey).use(cacheControl).use(preventRepeatReq).use(axiosMiddleware);

    return {
        context: {
            errorHandler,
            dataHandler: dataHandler || ((data) => data),
            instance,
            defaultConfig,
        },
        request: scheduler.compose(),
    };
}

function userConfigHandler(url, data, options = {}) {
    options.url = url;
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
            ...userConfig,
        },
    };
}

function getCustomerHandler(ctx, options = {}) {
    const { dataHandler, errorHandler } = ctx;
    return {
        dataHandler: options.dataHandler || dataHandler,
        errorHandler: options.errorHandler || errorHandler,
    };
}

export const request = (url, data, options = {}) => {
    if (typeof options === 'string') {
        options = {
            method: options,
        };
    }
    if (!currentRequestInstance) {
        currentRequestInstance = getRequestInstance();
    }
    const userConfig = userConfigHandler(url, data, options);
    const context = createContext(userConfig);
    const { dataHandler, errorHandler } = getCustomerHandler(context, options);

    return currentRequestInstance.request(context).then(async () => {
        if (!context.error) {
            return dataHandler(context.response.data, context.response);
        }
        errorHandler && errorHandler(context.error);
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
    promise
        .then((res) => {
            dataRef.value = res;
        })
        .catch((error) => {
            errorRef.value = error;
        })
        .finally(() => {
            loadingRef.value = false;
        });
    return {
        loading: loadingRef,
        error: errorRef,
        data: dataRef,
    };
};
