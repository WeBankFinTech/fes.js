const objectToString = Object.prototype.toString;
const OBJECT_STRING = '[object Object]';

export function isPlainObject(obj) {
    return objectToString.call(obj) === OBJECT_STRING;
}

export function isNumber(value) { return typeof value === 'number'; }

export function isDate(value) {
    return objectToString.call(value) === '[object Date]';
}

export function isFunction(value) { return typeof value === 'function'; }

export function isObject(value) {
    const type = typeof value;
    return !!value && (type === 'object' || type === 'function');
}

export function isArray(value) {
    return Array.isArray(value);
}

export function isObjectLike(value) {
    return !!value && typeof value === 'object';
}

export function isString(value) {
    return typeof value === 'string'
        || (!isArray(value) && isObjectLike(value) && objectToString.call(value) === '[object String]');
}

export function isNull(value) {
    return value === undefined || value === null || value === '';
}
