import { isFunction, isObject, isString } from './helpers';

export default async ({ response, responseDataAdaptor }, next) => {
    if (isFunction(responseDataAdaptor) && response && (isObject(response.data) || isString(response.data))) {
        response.data = responseDataAdaptor(response.data);
    }
    await next();
};
