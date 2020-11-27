/* eslint-disable import/no-dynamic-require */

const Mock = require('mockjs');
const faker = require('faker');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const httpProxy = require('http-proxy');
const url = require('url');
const log = require('./log');
const util = require('./util');

const router = express.Router();


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
    if (len === 0) {
        return option;
    }
    if (len === 1) {
        const newOption = arg[0];
        if (util.isObject(newOption)) {
            util.each(newOption, (value, key) => {
                if (key === 'headers') {
                    util.each(newOption.headers, (headervalue, headerkey) => {
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
    return path.resolve(PROJECT_DIR, value);
}

const createMock = function () {
    const cgiMock = function (...arg) {
        const option = getOption(arg);

        if (!option.url || !option.result) {
            return;
        }

        // option.method is one of ['get','post','delete','put'...]
        const method = option.method || 'use';

        router[method.toLowerCase()](option.url, (req, res) => {
            setTimeout(() => {
                // set header
                res.set(option.headers);

                // set Content-Type
                option.type && res.type(option.type);

                // set status code
                res.status(option.statusCode);

                // set cookie
                util.each(option.cookies, (item) => {
                    const name = item.name;
                    const value = item.value;
                    delete item.name;
                    delete item.value;
                    res.cookie(name, value, item);
                });

                // do result
                if (util.isFunction(option.result)) {
                    option.result(req, res);
                } else if (
                    util.isArray(option.result)
                    || util.isObject(option.result)
                ) {
                    !option.type && res.type('json');
                    res.json(option.result);
                } else {
                    !option.type && res.type('text');
                    res.send(option.result.toString());
                }
            }, option.timeout);
        });
    };

    cgiMock.prefix = '/';

    // 读取文件内容
    cgiMock.file = function (file) {
        return fs.readFileSync(parsePath(file));
    };

    cgiMock.proxy = function (host) {
        const proxy = httpProxy.createProxyServer();
        proxy.on('open', (proxySocket) => {
            proxySocket.on('data', (chunk) => {
                log.message(chunk.toString());
            });
        });
        proxy.on('proxyReq', (proxyReq, req) => {
            proxyReq.setHeader('Host', url.parse(host).host);
            if (req.body) {
                const bodyData = JSON.stringify(req.body);
                // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                // stream the content
                proxyReq.write(bodyData);
            }
        });
        proxy.on('proxyRes', (proxyRes) => {
            log.message(
                'RAW Response from the target',
                JSON.stringify(proxyRes.headers, true, 2)
            );
            const cookie = proxyRes.headers['set-cookie'];
            if (cookie && cookie.length > 0) {
                for (let i = 0; i < cookie.length; i++) {
                    cookie[i] = cookie[i].replace('Secure', '');
                }
            }
        });
        proxy.on('error', (e) => {
            log.error(e);
        });
        proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Host', url.parse(host).host);
        });
        process.nextTick(() => {
            router.use((req, res) => {
                proxy.web(req, res, {
                    target: host,
                    secure: false
                });
            });
        });
    };

    return cgiMock;
};

let cachePrefix = '';
const loadMock = function (app, cgiMockFile, cgiMock) {
    router.stack = [];
    util.cleanCache(cgiMockFile);
    const projectMock = require(cgiMockFile);
    if (!util.isFunction(projectMock)) {
        log.error('mock.js 应该导出Function !');
        return false;
    }
    projectMock(cgiMock, Mock, faker);
    cachePrefix = cgiMock.prefix;
    app.use(cachePrefix, (req, res, next) => {
        router(req, res, next);
    });
    return true;
};

const loadCustomRoute = function (app) {
    const PROJECT_DIR = process.env.PWD || process.cwd();
    const cgiMockFile = path.resolve(PROJECT_DIR, './mock.js');
    const cgiMock = createMock(app);
    if (!fs.existsSync(cgiMockFile)) {
        log.error('mock.js不存在，请检查!');
    } else {
        try {
            if (loadMock(app, cgiMockFile, cgiMock)) {
                log.message('mock.js 加载成功');
            }
            util.watchFile(cgiMockFile, () => {
                log.message('mock.js 发生变化，重新加载Mock');
                loadMock(app, cgiMockFile, cgiMock);
            });
        } catch (e) {
            log.error('mock.js 加载失败，请检查：');
            log.error(JSON.stringify(e));
        }
    }
};

module.exports = function (app) {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: false
        })
    );
    app.use(cookieParser());
    loadCustomRoute(app);
};
