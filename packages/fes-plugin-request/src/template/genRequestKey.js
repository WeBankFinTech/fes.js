import { isURLSearchParams } from './helpers';
/**
 * 唯一定位一个请求（url, data | params, method）
 *      其中请求参数(data, params)根据请求方法,只使用其中一个
 *      一个请求同时包含 data | params 参数的设计本身不合理
 *      不对这种情况进行兼容
 */
export default function genRequestKey(ctx, next) {
    const { url, data, method } = ctx.config;
    if (isURLSearchParams(data)) {
        ctx.key = `${url}${data.toString()}${method}`;
    }
    ctx.key = `${url}${JSON.stringify(data)}${method}`;
    next();
}
