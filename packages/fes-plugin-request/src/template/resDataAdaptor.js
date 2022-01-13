import { isFunction, isObject, isString } from './helpers';

export default async ({ response, responseDataAdaptor }, next) => {
    // 如果 data 是 blob 并且 content-type 是 application/json，自动进行数据处理
    if (response && response.data instanceof Blob && response.headers['content-type'].startsWith('application/json') && response.data.type === 'application/json') {
        const rawData = response.data;
        try {
            response.data = JSON.parse(await response.data.text());
        } catch {
            response.data = rawData;
        }
    }
    if (isFunction(responseDataAdaptor) && response && (isObject(response.data) || isString(response.data))) {
        response.data = responseDataAdaptor(response.data);
    }
    await next();
};
