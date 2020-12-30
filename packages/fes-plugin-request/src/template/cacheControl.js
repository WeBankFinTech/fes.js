import {
    isObject, isString, isURLSearchParams, checkHttpRequestHasBody
} from './helpers';
/**
 * 缓存实现的功能
 * 1. 唯一定位一个请求（url, data | params, method）
 *      其中请求参数根据请求方法使用其中一个就够了
 *      一个请求同时包含 data | params 参数的设计本身不合理
 *      不对这种情况进行兼容
 * 2. 控制缓存内容的大小，localStorage 只有5M
 * 3. 控制缓存时间
 *      session(存在内存中)
 *      expireTime 存在localStoreage 中
 * 4. 成功的、且响应内容为json的请求进行缓存
 */

/**
 * 配置数据
 * type: 'ram' | 'sessionStorage' | 'localStorage'
 * cacheTime: ''
 */


/**
 * 缓存数据结构
 * cache: {
 *      url: 'url', // 缓存 url
 *      data: data, // 数据
 *      expire: '' // 缓存时间
 * }
 */

/**
 * 请求参数可以为如下类型
 * - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
 * - Browser only: FormData, File, Blob
 * 只缓存参数类型为: string、plain object、URLSearchParams 或者无参数的 请求
 */

const CACHE_KEY_PREFIX = '__FES_REQUEST_CACHE:';
const CACHE_TYPE = {
    ram: 'ram',
    session: 'sessionStorage',
    local: 'localStorage'
};

const CACHE_DATA_MAP = new Map();

function genInnerKey(key, cacheType) {
    if (cacheType !== CACHE_TYPE.ram) {
        return `${CACHE_KEY_PREFIX}${key}`;
    }
    return key;
}

function canCache(data) {
    return !data || isObject(data) || isString(data) || Array.isArray(data) || isURLSearchParams(data);
}

function setCacheData({
    key,
    cacheType = 'ram',
    data,
    cacheTime = 1000 * 60 * 3
}) {
    const _key = genInnerKey(key, cacheType);

    const currentCacheData = {
        cacheType,
        data,
        cacheTime,
        expire: Date.now() + cacheTime
    };
    if (cacheType !== CACHE_TYPE.ram) {
        const cacheInstance = window[CACHE_TYPE[cacheType]];
        try {
            cacheInstance.setItem(_key, JSON.stringify(currentCacheData));
        } catch (e) {
            // setItem 出现异常，清理缓存
            for (const item in cacheInstance) {
                if (item.startsWith(CACHE_KEY_PREFIX) && Object.prototype.hasOwnProperty.call(cacheInstance, item)) {
                    cacheInstance.removeItem(item);
                }
            }
        }
    } else {
        CACHE_DATA_MAP.set(_key, currentCacheData);
    }
}

function isExpire({ expire, cacheTime }) {
    if (!cacheTime || expire >= Date.now()) {
        return false;
    }
    return true;
}

function getCacheData({ key, cacheType = 'ram' }) {
    const _key = genInnerKey(key, cacheType);
    if (cacheType !== CACHE_TYPE.ram) {
        const cacheInstance = window[CACHE_TYPE[cacheType]];
        const text = cacheInstance.getItem(_key) || null;
        try {
            const currentCacheData = JSON.parse(text);
            if (currentCacheData && !isExpire(currentCacheData)) {
                return currentCacheData.data;
            }
            cacheInstance.removeItem(_key);
            return null;
        } catch (e) {
            cacheInstance.removeItem(_key);
            return null;
        }
    } else {
        const currentCacheData = CACHE_DATA_MAP.get(_key);
        if (currentCacheData && !isExpire(currentCacheData)) {
            return currentCacheData.data;
        }
        CACHE_DATA_MAP.delete(_key);
        return null;
    }
}

export default async (ctx, next) => {
    const { config } = ctx;
    if (config.cache) {
        const cacheData = getCacheData({ key: ctx.key, cacheType: config.cache.cacheType });
        if (cacheData) {
            ctx.response = {
                data: cacheData
            };
            return;
        }
    }
    await next();

    if (config.cache) {
        const requestdata = checkHttpRequestHasBody(config.method) ? config.data : config.params;
        if (ctx.response && canCache(requestdata) && canCache(ctx.response.data)) {
            setCacheData({
                key: ctx.key,
                data: ctx.response.data,
                ...config.cache
            });
        }
    }
};
