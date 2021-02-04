import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { chokidar, lodash } from '@umijs/utils';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Mock from 'mockjs';


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
        }
    });

    const createMock = () => {
        // 判断是否为 Object，仅 {}
        function isObject(value) {
            return Object.prototype.toString.call(value) === '[object Object]';
        }
        // 对 array、object 遍历处理
        function traversalHandler(val, callback) {
            if (lodash.isArray(val)) {
                val.forEach(callback);
            }
            if (isObject(val)) {
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
                if (isObject(newOption)) {
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
            const PROJECT_DIR = process.env.PWD || process.cwd();
            return resolve(PROJECT_DIR, value);
        }

        const requestList = [];
        const cgiMock = (...arg) => {
            const option = getOption(arg);
            if (!option.url || !option.result) return;
            requestList.push(option);
        };
        cgiMock.file = function (file) {
            return readFileSync(parsePath(file));
        };

        // mock是否打开
        mockFlag = isObject(api.config.mock) ? true : api.config.mock;
        if (!mockFlag) return;
        // mock打开情况下，配置的过滤前缀
        mockPrefix = api.config.mock.prefix || mockPrefix;
        // mock文件处理
        mockFile = parsePath('./mock.js');
        if (!existsSync(mockFile)) {
            api.logger.info('mock.js File does not exist, please check'); return;
        }
        // 清除require的缓存，保证 mock 文件修改后拿到最新的 mock.js
        if (require.cache[mockFile]) {
            delete require.cache[mockFile];
        }
        const projectMock = require(mockFile);
        if (!lodash.isFunction(projectMock)) {
            api.logger.info('mock.js should export Function'); return;
        }
        // mock对象与 mock.js 结合
        projectMock(cgiMock, Mock);

        return (req, res, next) => {
            // 如果请求不是以 cgiMock.prefix 开头，直接 next `${mockPrefix}/`
            if (!req.path.startsWith(`${mockPrefix}/`)) {
                return next();
            }

            // 请求以 cgiMock.prefix 开头，匹配处理
            const matchRequet = requestList.filter(item => req.path.search(item.url) !== -1)[0];
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
                lodash.isArray(matchRequet.result) || isObject(matchRequet.result)
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
        loadMock = createMock();
        if (!mockFlag) return;

        chokidar.watch(mockFile, {
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
