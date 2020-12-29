import { checkHttpRequestHasBody, trimObj } from 'helpers';

export default (ctx, next) => {
    const config = ctx.config;
    if (checkHttpRequestHasBody(config.method)) {
        config.data = trimObj(config.data);
    } else {
        config.params = trimObj(config.params);
    }
    next();
};
