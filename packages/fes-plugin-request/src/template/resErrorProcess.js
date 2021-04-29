import { isObject } from './helpers';

function handleAbnormalCode(errorHandler = {}, code, response) {
    if (errorHandler[code]) {
        errorHandler[code](response.data);
    } else if (errorHandler.default) {
        // 处理其他异常
        errorHandler.default({
            response
        });
    }
}

function handleRequestError(errorHandler = {}, error) {
    if (error.type) {
        errorHandler[error.type] && errorHandler[error.type](error);
    } else if (error.response) {
        errorHandler[error.response.status] && errorHandler[error.response.status](error);
    } else if (errorHandler.default) {
        errorHandler.default(error);
    }
}

export default async (ctx, next) => {
    const {
        error,
        errorHandler = {},
        response,
        config
    } = ctx;
    if (!config.closeResDataCheck && response && isObject(response.data)) {
        const code = response.data.code;
        if (code !== '0') {
            handleAbnormalCode(errorHandler, code, response);
            ctx.error = response; // code 不为零进入 reject
        }
    } else if (error) {
        handleRequestError(errorHandler, error);
    }

    await next();
};
