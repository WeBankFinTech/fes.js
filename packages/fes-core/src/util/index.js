import _ from 'lodash';
import * as domUtil from './dom';
import * as objectUtil from './object';
import * as typeUtil from './type';
import format from './format';
import event from './event';
import history from './history';

const util = {
    // 验证一个path是否可以访问
    canRoute(path, allowPage) {
        path = path.split('?')[0];
        if (Array.isArray(allowPage) && allowPage.length > 0) {
            // 当路由为“/"时,传入的path为“”
            if (path === '') {
                path = '/';
            }
            for (let i = 0; i < allowPage.length; i++) {
                if (path === allowPage[i]) {
                    return true;
                }
                // 支持*匹配
                const reg = new RegExp(`^${allowPage[i].replace('*', '.+')}$`);
                if (reg.test(path)) {
                    return true;
                }
            }
        }

        return false;
    },
    getUrlParam(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        let r = window.location.search.substr(1).match(reg);
        const hashQuery = window.location.hash.split('?')[1];
        if (r != null) {
            return decodeURIComponent(r[2]);
        } if (hashQuery) {
            r = hashQuery.match(reg);
            return r && decodeURIComponent(r[2]);
        }
        return null;
    },
    removeParam(name, content) {
        if (typeof name !== 'string') return false;
        const prefix = encodeURIComponent(`${name}=`);
        const pars = content.split(/[&;]/g);
        let i = 0; const
            len = pars.length;
        let value = '';
        for (; i < len; i++) {
            if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        value = (pars.length > 0 ? `?${pars.join('&')}` : '');
        return value;
    },
    proxyFn(proxy, prop, apiArr) {
        proxy[prop] = {};
        const cache = {};
        if (window.Proxy) {
            proxy[prop] = new Proxy(proxy[prop], {
                get(target, name) {
                    cache[name] = cache[name] ? cache[name] : [];
                    if (!target[name]) {
                        target[name] = function (...args) {
                            cache[name].push(args);
                        };
                    }
                    return target[name];
                }
            });
        } else {
            apiArr.forEach((api) => {
                if (!proxy[prop][api]) {
                    proxy[prop][api] = function (...args) {
                        cache[api] = cache[api] ? cache[api] : [];
                        cache[api].push(args);
                    };
                }
            });
        }
        return cache;
    },
    _
};

export default {
    ...util,
    ...domUtil,
    ...objectUtil,
    ...typeUtil,
    format,
    event,
    history
};
