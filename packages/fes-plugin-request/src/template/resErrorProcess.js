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
            // 尽量保持内部 error 结构和 http 异常的 error 结构一致
            ctx.error = {
                ...response,
                response
            };
        }
    }

    await next();
};
