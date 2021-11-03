import { isObject } from './helpers';

// 错误处理等副作用网上提
export default async (ctx, next) => {
    const {
        response,
        config
    } = ctx;
    if (!config.closeResDataCheck && response && isObject(response.data)) {
        const code = response.data.code;
        if (code !== '0') {
            ctx.error = response; // code 不为零进入 reject
        }
    }

    await next();
};
