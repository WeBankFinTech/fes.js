import axios from 'axios';
import { ApplyPluginsType, plugin } from '@webank/fes';
import {
    checkHttpRequestHasBody,
    isFunction
} from './helpers';

import setDataField from './setDataField';
import paramsProcess from './paramsProcess';
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

    const instance = axios.create(Object.assign({
        timeout: 10000,
        withCredentials: true
    }, otherConfigs));

    // eslint-disable-next-line
    const dataField = REPLACE_DATA_FIELD;
    addRequestInterceptors(requestInterceptors);
    addResponseInterceptors(responseInterceptors);


    paramsProcess(instance);
    resDataAdaptor(instance, { responseDataAdaptor });
    resErrorProcess(instance, { errorConfig, errorHandler });
    setDataField(instance, dataField);

    return {
        instance
    };
}

let currentRequestInstance = null;
export const request = (url, data, options = {}) => {
    if (!currentRequestInstance) {
        const { instance } = getRequestInstance();
        currentRequestInstance = instance;
    }
    options.url = url;
    options.method = (options.method || 'post').toUpperCase();
    if (checkHttpRequestHasBody(options.method)) {
        options.data = data;
    } else {
        options.params = data;
    }
    return currentRequestInstance.request(options);
};
