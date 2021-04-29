/**
 * 操作Api
 */
import axios from 'axios';
import util from '../util';
import env from '../env';
import storage from '../storage';

const trim = function (obj) {
    Object.keys(obj).forEach((p) => {
        if (util.isString(obj[p])) {
            obj[p] = obj[p].trim();
        } else if (util.isPlainObject(obj[p])) {
            trim(obj[p]);
        } else if (util.isArray(obj[p])) {
            trim(obj[p]);
        }
    });
};

const requsetLog = {
    data: storage.get('FES_AJAX_LOG') || [],
    importantApi: {},
    creatLog(url, data, status) {
        let _data;
        if (data) {
            _data = JSON.stringify(data);
        }
        if (_data && _data.length > 1000) {
            data = _data.slice(0, 1000); // 大约1K
        }
        const now = new Date().getTime();
        const obj = {
            url,
            data,
            timestamp: now,
            status: status || 'send'
        };
        if (this.data.length >= 500) {
            this.data.shift();
        }
        this.data.push(obj);
        try {
            storage.set('FES_AJAX_LOG', this.data);
        } catch (e) {
            storage.remove('FES_AJAX_LOG');
            this.data = [obj];
            storage.set('FES_AJAX_LOG', this.data);
        }
        return obj;
    },
    changeLogStatus(log, newStatus) {
        const logs = this.data.filter(obj => obj.timestamp === log.timestamp);
        if (logs.length > 0) {
            logs[0].status = newStatus;
            storage.set('FES_AJAX_LOG', this.data);
        }
    },
    getLogByURL(url, data) {
        return this.data.filter(obj => obj.url === url && JSON.stringify(data) === JSON.stringify(obj.data));
    }
};

const instance = axios.create({
    method: 'post',
    baseURL: env.api,
    timeout: 10000,
    withCredentials: true
});

const api = {
    instance,
    error: {},
    constructionOfResponse: {
        codePath: 'code',
        successCode: '0',
        messagePath: 'msg',
        resultPath: 'result'
    }
};

const getData = function (data, resultFormat) {
    const _arr = ['codePath', 'messagePath', 'resultPath'];
    const arr = []; const
        rst = {};
    for (let i = 0; i < _arr.length; i++) {
        const pathArray = resultFormat[_arr[i]].split('.');
        const pathLength = pathArray.length;
        let result;
        if (pathLength === 1 && pathArray[0] === '*') {
            result = data;
        } else {
            result = data[pathArray[0]];
        }
        for (let j = 1; j < pathLength; j++) {
            result = result[pathArray[j]];
            if (!result) {
                if (j < pathLength - 1) {
                    console.error(`【FEX】ConstructionOfResponse配置错误：${_arr[i]}拿到的值是undefined，请检查配置`);
                }
                break;
            }
        }
        arr.push(result);
    }
    rst.code = arr[0];
    rst.message = arr[1];
    rst.result = arr[2];
    return rst;
};

const success = function (response) {
    // 响应结构
    const resultFormat = (response.config && response.config.resultFormat) || api.constructionOfResponse;
    // 哪些code不处理错误
    const ignoreCode = (response.config && response.config.ignoreCode) || [];
    if (util.isNull(resultFormat.codePath) || util.isNull(resultFormat.successCode)
        || util.isNull(resultFormat.messagePath) || util.isNull(resultFormat.resultPath)) {
        console.error('【FEX】Api配置错误: 请调用setConstructionOfResponse来设置API的响应结构');
        return null;
    }

    let data;
    if (util.isString(response.data)) {
        data = JSON.parse(response.data);
    } else if (util.isObject(response.data)) {
        data = response.data;
    } else {
        throw new Error(util.format('fesMessages.defaultError'));
    }

    const { code, message, result } = getData(data, resultFormat);

    if (code !== resultFormat.successCode) {
        let _message = '';
        if (api.error[code]) {
            api.error[code].forEach(fn => fn(response));
        } else if (!ignoreCode.includes(code) && ignoreCode !== '*') {
            _message = message || util.format('fesMessages.defaultError');
        }
        const error = new Error(_message);
        error.response = response;
        throw error;
    }
    // eslint-disable-next-line no-undefined
    return (result === undefined || result === null) || {};
};

const fail = function (error) {
    let _message = '';
    const response = error.response;
    if (response && api.error[response.status]) {
        api.error[response.status].forEach(fn => fn(response));
    } else {
        _message = util.format('fesMessages.defaultError');
        try {
            if (response && response.data) {
                let data;
                if (util.isString(response.data)) {
                    data = JSON.parse(response.data);
                } else if (util.isObject(response.data)) {
                    data = response.data;
                }
                if (data) {
                    const { message } = getData(data, (response.config && response.config.resultFormat) || api.constructionOfResponse);
                    _message = message;
                }
            }
        } catch (e) {
            // 可以啥都不做
        }
    }
    error.message = _message;
    throw error;
};

// eslint-disable-next-line complexity
const param = function (url, data, option) {
    const method = instance.defaults.method || 'post';
    if (util.isNull(url)) {
        return console.error('请传入URL');
    } if (!util.isNull(url) && util.isNull(data) && util.isNull(option)) {
        option = {
            method
        };
    } else if (!util.isNull(url) && !util.isNull(data) && util.isNull(option)) {
        option = {
            method
        };
        if (util.isString(data)) {
            option.method = data;
        } else if (util.isObject(data)) {
            option.data = data;
        }
    } else if (!util.isNull(url) && !util.isNull(data) && !util.isNull(option)) {
        if (!util.isObject(data)) {
            data = {};
        }
        if (util.isString(option)) {
            option = {
                method: option
            };
        } else if (util.isObject(option)) {
            option.method = option.method || method;
        } else {
            option = {
                method
            };
        }
        if (option.method === 'get' || option.method === 'delete' || option.method === 'head' || option.method === 'options') {
            option.params = data;
        }
        if (option.method === 'post' || option.method === 'put' || option.method === 'patch') {
            option.data = data;
        }
    }
    // 过滤参数中的空格
    const _data = option.params || option.data;
    if (_data && util.isObject(_data) && option.trim !== false) {
        trim(_data);
    }

    option.url = url;

    // 如果传了button
    if (option.button) {
        option.button.currentDisabled = true;
    }

    return instance.request(option);
};

const action = function (url, data, option) {
    // 记录日志
    const log = requsetLog.creatLog(url, data);

    return param(url, data, option)
        .then(success, fail)
        .then((response) => {
            requsetLog.changeLogStatus(log, 'success');
            if (option && option.button) {
                option.button.currentDisabled = false;
            }
            return response;
        })
        .catch((error) => {
            requsetLog.changeLogStatus(log, 'fail');
            if (option && option.button) {
                option.button.currentDisabled = false;
            }
            error.message && window.Toast.error(error.message);
            throw error;
        });
};

api.fetch = function (url, data, option) {
    if (requsetLog.importantApi[url]) {
        const logs = requsetLog.getLogByURL(url, data);
        if (logs.length > 0) {
            const compareLog = logs[logs.length - 1];
            if (compareLog.status === 'compare') {
                requsetLog.creatLog(url, data, 'notAllowed');
                return {
                    then: () => {}
                };
            }
            const importantApiOption = requsetLog.importantApi[url];
            const control = importantApiOption.control || 10000;
            const message = importantApiOption.message || util.format('fesMessages.importInterfaceTip', { s: control / 1000 });
            if (new Date().getTime() - compareLog.timestamp < control) {
                const oldStatus = compareLog.status;
                requsetLog.changeLogStatus(compareLog, 'compare');
                return new Promise(((resolve, reject) => {
                    window.Message.confirm(util.format('fesMessages.tip'), message).then((index) => {
                        if (compareLog.status === 'compare') {
                            requsetLog.changeLogStatus(compareLog, oldStatus);
                        }
                        if (index === 0) {
                            resolve(action(url, data, option));
                        } else {
                            reject(new Error('不允许相同操作间隔过小'));
                        }
                    });
                }));
            }
            return action(url, data, option);
        }
        return action(url, data, option);
    }
    return action(url, data, option);
};

/**
 * 设置 request Header
 * @param headers Object
 */
api.setHeader = function (headers = {}) {
    Object.keys(headers).forEach((p) => {
        if (['delete', 'get', 'head', 'post', 'put', 'patch', 'common'].includes(p)) {
            instance.defaults.headers[p] = Object.assign({}, instance.defaults.headers[p], headers[p]);
        } else {
            instance.defaults.headers.common[p] = headers[p];
        }
    });
};

/**
 * 配置ajax请求参数
 * @param option
 */
api.option = function (option = {}) {
    const {
        root,
        baseURL,
        timeout,
        headers,
        config,
        ...others
    } = option;
    if (root || baseURL) {
        instance.defaults.baseURL = root || baseURL;
    }
    if (timeout && util.isNumber(timeout)) {
        instance.defaults.timeout = timeout;
    }
    if (headers) {
        api.setHeader(headers);
    }
    const otherPropertys = Object.assign({}, others, config);
    Object.keys(otherPropertys).forEach((p) => {
        instance.defaults[p] = otherPropertys[p];
    });
};

/**
 * 请求拦截器
 * @param before function 请求之前的拦截器
 */
api.setReqInterceptor = function (before, error) {
    if (Array.isArray(before)) {
        return instance.interceptors.request.use(...before);
    }
    return instance.interceptors.request.use(before, error);
};
api.ejectReqInterceptor = function (interceptor) {
    return instance.interceptors.request.eject(interceptor);
};

/**
 * 响应拦截器
 * @param after function 响应之后的拦截器
 */
api.setResInterceptor = function (after, error) {
    if (Array.isArray(after)) {
        return instance.interceptors.response.use(...after);
    }
    return instance.interceptors.response.use(after, error);
};
api.ejectResInterceptor = function (interceptor) {
    return instance.interceptors.response.eject(interceptor);
};

/**
 * 配置错误响应
 * @param option
 */
api.setError = function (option) {
    if (option && util.isObject(option)) {
        Object.keys(option).forEach((key) => {
            if (!util.isArray(api.error[key])) {
                api.error[key] = [];
            }
            api.error[key].push(option[key]);
        });
    }
};

/**
 * 设置响应结构
 * @param constructionOfResponse
 */
api.setResponse = function (constructionOfResponse) {
    this.constructionOfResponse = constructionOfResponse;
};

/**
 *  配置重要请求
 */
api.setImportant = function (option) {
    if (option && util.isObject(option)) {
        requsetLog.importantApi = option;
    } else {
        console.error('【FEX】ImportantApi配置错误: 参数必须是对象{"/get": { message:"xxx", control: 10000 } }');
    }
};

export default api;
