import { isObject } from './helpers';

export default async (ctx, next) => {
    const dataField = ctx.config.dataField ?? ctx.dataField;
    if (ctx.response && isObject(ctx.response.data) && dataField) {
        ctx.response._rawData = ctx.response.data;
        ctx.response.data = ctx.response.data[dataField];
    }
    await next();
};
