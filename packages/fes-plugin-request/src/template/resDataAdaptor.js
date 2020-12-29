import { isFunction, isObject, isString } from './helpers';

export default ({ response, responseDataAdaptor }, next) => {
    if (isFunction(responseDataAdaptor) && (isObject(response.data) || isString(response.data))) {
        response.data = responseDataAdaptor(response.data);
    }
    next();
};
