import { isObject } from './helpers';

export default (ctx, next) => {
    const { dataField, response } = ctx;
    if (isObject(response.data) && dataField) {
        ctx.response._rawData = response.data;
        ctx.response.data = response.data[dataField];
    }
    next();
};
