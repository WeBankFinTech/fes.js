import { isObject } from './helpers';

function handleAbnormalCode(errorHandler = {}, code, response) {
    if (errorHandler[code]) {
        errorHandler[code](response);
    } else if (errorHandler.commonAbnormalCodeHandler) {
        // 处理其他异常
        errorHandler.commonAbnormalCodeHandler(response);
    }
}

export default async (ctx, next) => {
    const {
        error,
        errorHandler = {},
        response
    } = ctx;
    if (response && isObject(response.data)) {
        const code = response.data.code;
        if (code !== '0') {
            handleAbnormalCode(errorHandler, code, response);
            ctx.error = response; // code 不为零进入 reject
        }
    } else if (error) {
        if (error.type) {
            errorHandler[error.type] && errorHandler[error.type](error);
        } else if (error.response) {
            errorHandler[error.response.status] && errorHandler[error.response.status](error);
        }
    }

    await next();
};
