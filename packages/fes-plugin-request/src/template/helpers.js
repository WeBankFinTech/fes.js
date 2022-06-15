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
        '[object URLSearchParams]': 'URLSearchParams',
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

export function checkHttpRequestHasBody(method) {
    method = method.toUpperCase();
    const HTTP_METHOD = {
        GET: {
            request_body: false,
        },
        POST: {
            request_body: true,
        },
        PUT: {
            request_body: true,
        },
        DELETE: {
            request_body: true,
        },
        HEAD: {
            request_body: false,
        },
        OPTIONS: {
            request_body: false,
        },
        PATCH: {
            request_body: true,
        },
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
            }
        });
    }
}
