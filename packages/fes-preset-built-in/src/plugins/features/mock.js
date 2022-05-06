import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { chokidar, lodash, parseRequireDeps } from '@fesjs/utils';

function getContentType(type) {
    const mime = require('mime');
    return type.indexOf('/') === -1 ? mime.getType(type) : type;
}

function setCookie(res, name, value, opts = {}) {
    const val = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

    if ('maxAge' in opts) {
        opts.expires = new Date(Date.now() + opts.maxAge);
        opts.maxAge /= 1000;
    }

    if (opts.path == null) {
        opts.path = '/';
    }
    const cookie = require('cookie');
    res.setHeader('Set-Cookie', cookie.serialize(name, String(val), opts));
}

export default (api) => {
    let mockFlag = false; // mock 开关flag
    let mockPrefix = '/'; // mock 过滤前缀
    let mockFile = ''; // mock 文件
    let loadMock = ''; // mock 对象

    const registerBabel = (paths) => {
        // support
        // clear require cache and set babel register
        const requireDeps = paths.reduce((memo, file) => {
            memo = memo.concat(parseRequireDeps(file));
            return memo;
        }, []);
        requireDeps.forEach((f) => {
            if (require.cache[f]) {
                delete require.cache[f];
            }
        });
        api.babelRegister.setOnlyMap({
            key: 'mock',
            value: [...paths, ...requireDeps],
        });
    };

    api.describe({
        key: 'mock',
        config: {
            schema(joi) {
                return joi.alternatives(joi.boolean(), joi.object());
            },
        },
        enableBy: () => process.env.NODE_ENV === 'development',
    });

    // 对 array、object 遍历处理
    function traversalHandler(val, callback) {
        if (lodash.isArray(val)) {
            val.forEach(callback);
        }
        if (lodash.isPlainObject(val)) {
            Object.keys(val).forEach((key) => {
                callback(val[key], key);
            });
        }
    }

    // 根据参数个数获取配置
    function getOption(arg) {
        const len = arg.length;
        // 默认配置
        const option = {
            headers: {
                'Cache-Control': 'no-cache',
            },
            statusCode: 200,
            cookies: [],
            timeout: 0,
        };
        if (len === 0) return option;
        if (len === 1) {
            const newOption = arg[0];
            if (lodash.isPlainObject(newOption)) {
                traversalHandler(newOption, (value, key) => {
                    if (key === 'headers') {
                        traversalHandler(newOption.headers, (headervalue, headerkey) => {
                            option.headers[headerkey] = newOption.headers[headerkey];
                        });
                    } else {
                        option[key] = newOption[key];
                    }
                });
            }
        } else {
            option.url = arg[0];
            option.result = arg[1];
        }
        return option;
    }

    // 把基于 cgiMockfile 的相对绝对转成绝对路径
    function parsePath(value) {
        return resolve(api.cwd, value);
    }

    const createMock = () => {
        const requestList = [];
        const cgiMock = (...arg) => {
            const option = getOption(arg);
            if (!option.url || !option.result) return;
            requestList.push(option);
        };

        const utils = {};
        utils.file = function (file) {
            return readFileSync(parsePath(file));
        };

        // mock打开情况下，配置的过滤前缀
        const mockPrefixTemp = api.config.mock.prefix || mockPrefix;
        mockPrefix = mockPrefixTemp === mockPrefix ? mockPrefixTemp : `${mockPrefixTemp}/`;
        // mock文件处理
        mockFile = parsePath('./mock.js');
        if (!existsSync(mockFile)) {
            api.logger.info('mock.js File does not exist, please check');
            return;
        }
        // 清除require的缓存，保证 mock 文件修改后拿到最新的 mock.js
        if (require.cache[mockFile]) {
            delete require.cache[mockFile];
        }
        // require最新的 mock.js 文件
        try {
            // register babel
            registerBabel([mockFile]);
            const _initFunction = require(mockFile);
            const initFunction = _initFunction.default || _initFunction;
            if (!lodash.isFunction(initFunction)) {
                api.logger.info('mock.js should export Function');
                return;
            }
            const mockjs = require('mockjs');
            initFunction({ cgiMock, mockjs, utils });
        } catch (err) {
            api.logger.error('mock.js run fail!');
        }

        const express = require('express');
        const app = express();

        app.use((req, res, next) => {
            // 如果请求不是以 cgiMock.prefix 开头，直接 next
            if (!req.url.startsWith(mockPrefix)) {
                return next();
            }
            // 请求以 cgiMock.prefix 开头，匹配处理
            const matchRequet = requestList.find((item) => req.url.search(item.url) !== -1);
            if (!matchRequet) {
                return next();
            }

            const sendData = () => {
                if (matchRequet.headers) {
                    for (const [key, value] of Object.entries(matchRequet.headers)) {
                        res.setHeader(key, value);
                    }
                }
                if (matchRequet.type) {
                    res.setHeader('Content-Type', getContentType(matchRequet.type));
                }
                // set status code
                res.statusCode = matchRequet.statusCode;
                // set cookie
                traversalHandler(matchRequet.cookies, (item) => {
                    const name = item.name;
                    const value = item.value;
                    delete item.name;
                    delete item.value;
                    setCookie(res, name, value, item);
                });

                // do result
                if (lodash.isFunction(matchRequet.result)) {
                    matchRequet.result(req, res);
                } else if (lodash.isArray(matchRequet.result) || lodash.isPlainObject(matchRequet.result)) {
                    !matchRequet.type && res.setHeader('Content-Type', getContentType('json'));
                    res.end(JSON.stringify(matchRequet.result));
                } else {
                    !matchRequet.type && res.setHeader('Content-Type', getContentType('text'));
                    res.end(matchRequet.result.toString());
                }
            };

            sendData();
        });

        return app;
    };

    api.onStart(() => {
        // 获取mock配置: 是否打开
        mockFlag = lodash.isPlainObject(api.config.mock) ? true : api.config.mock;
        if (!mockFlag) return;

        loadMock = createMock();
        return chokidar
            .watch(mockFile, {
                ignoreInitial: true,
            })
            .on('change', () => {
                api.logger.info('mock.js changed，reload');
                loadMock = createMock();
            });
    });

    api.addBeforeMiddlewares(() => (req, res, next) => {
        if (!mockFlag) return next();
        loadMock(req, res, next);
    });
};
