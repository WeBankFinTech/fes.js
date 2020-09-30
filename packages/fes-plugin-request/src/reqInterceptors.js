import { checkHttpRequestHasBody, trimObj } from './helpers';

export default function reqInterceptors(instance) {
    // 将 http method 转换为大写
    instance.interceptors.request.use((config) => {
        config.method = config.method.toUpperCase();
        return config;
    });

    // 清理请求值中的空格
    instance.interceptors.request.use((config) => {
        if (checkHttpRequestHasBody(config.method)) {
            config.data = trimObj(config.data);
        } else {
            config.params = trimObj(config.params);
        }
        return config;
    });
}
