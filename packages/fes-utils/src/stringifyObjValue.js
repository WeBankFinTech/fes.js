import lodash from 'lodash';

export default (obj) => {
    const newObj = lodash.cloneDeep(obj);
    for (const key in newObj) {
        if (Object.prototype.hasOwnProperty.call(newObj, key)) {
            newObj[key] = JSON.stringify(newObj[key]);
        }
    }

    return newObj;
};
