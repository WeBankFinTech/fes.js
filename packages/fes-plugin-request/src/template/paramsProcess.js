import { checkHttpRequestHasBody, trimObj } from './helpers';

export default async (ctx, next) => {
    const config = ctx.config;
    if (checkHttpRequestHasBody(config.method)) {
        trimObj(config.data);
    } else {
        trimObj(config.params);
    }
    await next();
};
