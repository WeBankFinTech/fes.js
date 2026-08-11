import { isPlainObject, isEqual as deepIsEqual } from 'es-toolkit/compat';

function funcToStr(obj: any): any {
    if (typeof obj === 'function') {
        return obj.toString();
    }
    if (isPlainObject(obj)) {
        return Object.keys(obj).reduce((memo: Record<string, any>, key: string) => {
            memo[key] = funcToStr(obj[key]);
            return memo;
        }, {});
    }
    return obj;
}

export default function isEqual(a: any, b: any): boolean {
    return deepIsEqual(funcToStr(a), funcToStr(b));
}
