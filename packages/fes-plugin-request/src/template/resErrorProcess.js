import { isObject, isFunction } from 'helpers';

function resErrorProcess(error, customerErrorHandler) {
    if (isFunction(error)) {
        error();
    } else {
        customerErrorHandler && customerErrorHandler(error);
    }
}


export default ({
    error,
    errorConfig,
    errorHandler,
    response
}, next) => {
    const _errorConfig = Object.assign({
        403: '用户得到授权，但访问是禁止的'
    }, errorConfig);

    if (isObject(response.data) && response.data.code !== '0') {
        resErrorProcess(_errorConfig[response.data.code] || response.data.msg || response.data.errorMessage || response.data.errorMsg || '服务异常', errorHandler);
    } else if (error && error.response && _errorConfig[error.response.status]) {
        resErrorProcess(_errorConfig[error.response.status], errorHandler);
    }

    next();
};
