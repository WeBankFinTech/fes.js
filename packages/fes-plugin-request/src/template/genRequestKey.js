import { isURLSearchParams } from './helpers';
/**
 * 唯一定位一个请求（url, data | params, method）
 *      其中请求参数(data, params)根据请求方法,只使用其中一个
 *      一个请求同时包含 data | params 参数的设计本身不合理
 *      不对这种情况进行兼容
 */

const getQueryString = (data) => {
    if (isURLSearchParams(data)) {
        return data.toString();
    }
    return data ? JSON.stringify(data) : '';
};

export default async function genRequestKey(ctx, next) {
    const { url, data, params, method } = ctx.config;

    ctx.key = `${url}${getQueryString(data)}${getQueryString(params)}${method}`;

    await next();
}
