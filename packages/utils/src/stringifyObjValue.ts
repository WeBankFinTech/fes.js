import { cloneDeep } from 'es-toolkit/compat';

export default (obj: Record<string, any>): Record<string, string> => {
    const newObj: Record<string, any> = cloneDeep(obj);
    for (const key in newObj) {
        if (Object.prototype.hasOwnProperty.call(newObj, key)) {
            newObj[key] = JSON.stringify(newObj[key]);
        }
    }

    return newObj;
};
