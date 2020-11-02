import { lodash } from '@umijs/utils';

function funcToStr(obj) {
    if (typeof obj === 'function') return obj.toString();
    if (lodash.isPlainObject(obj)) {
        return Object.keys(obj).reduce((memo, key) => {
            memo[key] = funcToStr(obj[key]);
            return memo;
        }, {});
    }
    return obj;
}

export default function (a, b) {
    return lodash.isEqual(funcToStr(a), funcToStr(b));
}
