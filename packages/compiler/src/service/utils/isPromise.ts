/**
 * 判断对象是否为 Promise
 * @param obj 待判断的对象
 * @returns 如果是 Promise 返回 true，否则返回 false
 */
export default function isPromise(obj: any): obj is Promise<any> {
    return (
        !!obj
        && (typeof obj === 'object' || typeof obj === 'function')
        && typeof obj.then === 'function'
    );
}
