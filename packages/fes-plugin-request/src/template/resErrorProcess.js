import { isObject, isFunction } from 'helpers';

function resErrorProcess(error, customerErrorHandler) {
    if (isFunction(error)) {
        error();
    } else {
        customerErrorHandler && customerErrorHandler(error);
    }
}

export default (instance, { errorConfig, errorHandler }) => {
    const _errorConfig = Object.assign({
        401: {
            showType: 9,
            errorPage: '/login'
        },
        403: '用户得到授权，但访问是禁止的'
    }, errorConfig);

    instance.interceptors.response.use((response) => {
        if (isObject(response.data) && response.data.code !== '0') {
            resErrorProcess(_errorConfig[response.data.code] || response.data.msg || response.data.errorMessage || response.data.errorMsg || '服务异常', errorHandler);
            return Promise.reject(response);
        }

        return response;
    }, (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (_errorConfig[error.response.status]) {
                resErrorProcess(_errorConfig[error.response.status], errorHandler);
            }
        }
        return Promise.reject(error);
    });
};
