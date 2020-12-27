import { checkHttpRequestHasBody, trimObj } from 'helpers';

export default (instance) => {
    instance.interceptors.request.use((config) => {
        if (checkHttpRequestHasBody(config.method)) {
            config.data = trimObj(config.data);
        } else {
            config.params = trimObj(config.params);
        }
        return config;
    });
};
