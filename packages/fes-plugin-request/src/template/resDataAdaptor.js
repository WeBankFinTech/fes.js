import { isFunction, isObject, isString } from './helpers';

export default (instance, { responseDataAdaptor }) => {
    instance.interceptors.response.use((response) => {
        // 响应内容可能是个文件流 or 普通文本
        if (isFunction(responseDataAdaptor) && (isObject(response.data) || isString(response.data))) {
            response.data = responseDataAdaptor(response.data);
        }
        return response;
    });
};
