import { lodash } from '@fesjs/utils';

function funcToStr(obj: any): any {
    if (typeof obj === 'function') {
        return obj.toString();
    }
    if (lodash.isPlainObject(obj)) {
        return Object.keys(obj).reduce((memo: Record<string, any>, key: string) => {
            memo[key] = funcToStr(obj[key]);
            return memo;
        }, {});
    }
    return obj;
}

export default function isEqual(a: any, b: any): boolean {
    return lodash.isEqual(funcToStr(a), funcToStr(b));
}
