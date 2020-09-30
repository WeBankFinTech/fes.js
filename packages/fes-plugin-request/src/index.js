import { debounce } from 'throttle-debounce';
import initAxiosInstance from './request';

let request;

function _advanceRequest({ url, debounce: waitTime, options = {} }) {
    return debounce((data, specialCaseOptions) => {
        request(url, data, Object.assign(options, specialCaseOptions));
    }, true, waitTime || 0);
}

export const requestWrap = (interfaces) => {
    const obj = {};
    Object.entries(interfaces).forEach(([key, value]) => {
        if (value.url) {
            obj[key] = _advanceRequest(value);
        } else {
            obj[key] = requestWrap(value);
        }
    });
    return obj;
};

export const createRequest = () => ({
    install(app, options, ctx) {
        request = initAxiosInstance(options, { router: ctx.router });
        ctx.request = request;
    }
});
