import { isObject } from './helpers';

export default async (ctx, next) => {
    const { dataField, response } = ctx;
    if (response && isObject(response.data) && dataField) {
        ctx.response._rawData = response.data;
        ctx.response.data = response.data[dataField];
    }
    await next();
};
