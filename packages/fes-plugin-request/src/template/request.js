import axios from 'axios';
import { ApplyPluginsType, plugin } from '@webank/fes';
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
        errorConfig,
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

    scheduler.use(paramsProcess)
        .use(genRequestKey)
        .use(preventRepeatReq)
        .use(throttle)
        .use(cacheControl)
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
            errorConfig,
            errorHandler
        },
        request: scheduler.compose()
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
            ...userConfig
        }
    };
}

export const request = (url, data, options = {}) => {
    if (!currentRequestInstance) {
        currentRequestInstance = getRequestInstance();
    }
    const userConfig = userConfigHandler(url, data, options);
    const context = createContext(userConfig);

    return currentRequestInstance.request(context).then(() => {
        if (!context.error) {
            return context.config.useResonse ? context.response : context.response.data;
        }
        return Promise.reject(context.error);
    });
};
