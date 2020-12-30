import { isObject } from './helpers';

export default async ({
    error,
    errorHandler = {},
    response
}, next) => {
    if (response && isObject(response.data) && response.data.code !== '0') {
        errorHandler[response.data.code] && errorHandler[response.data.code](response);
    } else if (error) {
        if (error.type) {
            errorHandler[error.type] && errorHandler[error.type](error);
        } else if (error.response) {
            errorHandler[error.response.status] && errorHandler[error.response.status](error);
        }
    }

    await next();
};
