/**
 *判断类型
 * @param {*} obj 需要判断的对象
 */
export function typeOf(obj) {
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
        '[object URLSearchParams]': 'URLSearchParams'
    };
    return map[Object.prototype.toString.call(obj)];
}

export function isFunction(obj) {
    return typeOf(obj) === 'function';
}

export function isDate(obj) {
    return typeOf(obj) === 'date';
}

export function isString(obj) {
    return typeOf(obj) === 'string';
}

export function isArray(obj) {
    return typeOf(obj) === 'array';
}

export function isObject(obj) {
    return typeOf(obj) === 'object';
}

export function isURLSearchParams(obj) {
    return typeOf(obj) === 'URLSearchParams';
}

// eslint-disable-next-line
export const isUndefined = val => val === undefined;

export const isDefined = val => val != null;


export function checkHttpRequestHasBody(method) {
    method = method.toUpperCase();
    const HTTP_METHOD = {
        GET: {
            request_body: false
        },
        POST: {
            request_body: true
        },
        PUT: {
            request_body: true
        },
        DELETE: {
            request_body: true
        },
        HEAD: {
            request_body: false
        },
        OPTIONS: {
            request_body: false
        },
        PATCH: {
            request_body: true
        }
    };
    return HTTP_METHOD[method].request_body;
}

export function trimObj(obj) {
    if (isObject(obj)) {
        Object.entries(obj).forEach(([key, value]) => {
            if (isString(value)) {
                obj[key] = value.trim();
            } else if (isObject(value)) {
                trimObj(value);
            } else if (Array.isArray(value)) {
                trimObj(value);
            }
        });
    }
}

/**
 * 唯一定位一个请求（url, data | params, method）
 *      其中请求参数(data, params)根据请求方法,只使用其中一个
 *      一个请求同时包含 data | params 参数的设计本身不合理
 *      不对这种情况进行兼容
 */
export function genRequestKey(url, data, method) {
    if (isURLSearchParams(data)) {
        return `${url}${data.toString()}${method}`;
    }
    return `${url}${JSON.stringify(data)}${method}`;
}
