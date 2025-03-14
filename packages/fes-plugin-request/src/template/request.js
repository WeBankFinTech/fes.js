import { ApplyPluginsType, plugin } from '@fesjs/fes';
import { createRequest } from '@qlin/request';

import { ref, shallowRef } from 'vue';

function getRequestInstance() {
    const defaultConfig = plugin.applyPlugins({
        key: 'request',
        type: ApplyPluginsType.modify,
        initialValue: {
            timeout: 10000,
        },
    });

    return createRequest(defaultConfig);
}

// 不能立马初始化，用户配置可能还没准备好
let currentRequest;

export function rawRequest(url, data, options = {}) {
    if (!currentRequest) {
        currentRequest = getRequestInstance();
        // 将 request 实例上的属性挂在到 rawRequest 上。
        Object.assign(rawRequest, currentRequest);
    }
    return currentRequest(url, data, options);
}

export async function request(url, data, options = {}) {
    const response = await rawRequest(url, data, options);
    return response.data;
}

request.version = '4.0.0';

function isPromiseLike(obj) {
    return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
}

export function useRequest(url, data, options = {}) {
    const loadingRef = ref(true);
    const errorRef = ref(null);
    const dataRef = shallowRef(null);
    let promise;
    if (isPromiseLike(url)) {
        promise = url;
    }
    else {
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
}
