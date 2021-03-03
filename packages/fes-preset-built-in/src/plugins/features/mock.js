import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { chokidar, lodash } from '@umijs/utils';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mockjs from 'mockjs';

export default (api) => {
    let mockFlag = false; // mock 开关flag
    let mockPrefix = '/'; // mock 过滤前缀
    let mockFile = ''; // mock 文件
    let loadMock = ''; // mock 对象

    api.describe({
        key: 'mock',
        config: {
            schema(joi) {
                return joi.alternatives(joi.boolean(), joi.object());
            }
        },
        enableBy: () => process.env.NODE_ENV === 'development'
    });

    // 对 array、object 遍历处理
    function traversalHandler(val, callback) {
        if (lodash.isArray(val)) {
            val.forEach(callback);
        }
        if (lodash.isPlainObject(val)) {
            Object.keys(val).forEach((key) => { callback(val[key], key); });
        }
    }

    // 根据参数个数获取配置
    function getOption(arg) {
        const len = arg.length;
        // 默认配置
        const option = {
            headers: {
                'Cache-Control': 'no-cache'
            },
            statusCode: 200,
            cookies: [],
            timeout: 0
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
            api.logger.info('mock.js File does not exist, please check'); return;
        }
        // 清除require的缓存，保证 mock 文件修改后拿到最新的 mock.js
        if (require.cache[mockFile]) {
            delete require.cache[mockFile];
        }
        // require最新的 mock.js 文件
        try {
            const projectMock = require(mockFile);
            if (!lodash.isFunction(projectMock)) {
                api.logger.info('mock.js should export Function'); return;
            }
            projectMock({ cgiMock, mockjs, utils });
        } catch (err) {
            api.logger.error('mock.js run fail!');
        }

        return (req, res, next) => {
            // 如果请求不是以 cgiMock.prefix 开头，直接 next
            if (!req.path.startsWith(mockPrefix)) {
                return next();
            }
            // 请求以 cgiMock.prefix 开头，匹配处理
            const matchRequet = requestList.find(item => req.path.search(item.url) !== -1);
            if (!matchRequet) {
                return next();
            }

            // set header
            res.set(matchRequet.headers);
            // set Content-Type
            matchRequet.type && res.type(matchRequet.type);
            // set status code
            res.status(matchRequet.statusCode);
            // set cookie
            traversalHandler(matchRequet.cookies, (item) => {
                const name = item.name;
                const value = item.value;
                delete item.name;
                delete item.value;
                res.cookie(name, value, item);
            });

            // do result
            if (lodash.isFunction(matchRequet.result)) {
                matchRequet.result(req, res);
            } else if (
                lodash.isArray(matchRequet.result) || lodash.isPlainObject(matchRequet.result)
            ) {
                !matchRequet.type && res.type('json');
                res.json(matchRequet.result);
            } else {
                !matchRequet.type && res.type('text');
                res.send(matchRequet.result.toString());
            }
        };
    };

    api.onStart(() => {
        // 获取mock配置: 是否打开
        mockFlag = lodash.isPlainObject(api.config.mock) ? true : api.config.mock;
        if (!mockFlag) return;

        loadMock = createMock();
        return chokidar.watch(mockFile, {
            ignoreInitial: true
        }).on('change', () => {
            api.logger.info('mock.js changed，reload');
            loadMock = createMock();
        });
    });

    api.addBeforeMiddlewares(() => {
        if (!mockFlag) return [];
        return [
            bodyParser.json(),
            bodyParser.urlencoded({
                extended: false
            }),
            cookieParser()
        ];
    });
    api.addBeforeMiddlewares(() => (req, res, next) => {
        if (!mockFlag) return next();
        loadMock(req, res, next);
    });
};
