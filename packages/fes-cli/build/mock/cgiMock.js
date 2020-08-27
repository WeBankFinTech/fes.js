const express = require('express');
const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy');
const url = require('url');

const util = require('./util');

const proxy = httpProxy.createProxyServer();
global.router = express.Router();

/**
 * 数据模拟函数
 */
function cgiMock() {
    // eslint-disable-next-line
    const option = getOption(arguments);

    if (!option.url || !option.result) {
        return;
    }

    // option.method is one of ['get','post','delete','put'...]
    const method = option.method || 'use';

    global.router[method.toLowerCase()](option.url, (req, res) => {
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
            } else if (util.isArray(option.result) || util.isObject(option.result)) {
                !option.type && res.type('json');
                res.json(option.result);
            } else {
                !option.type && res.type('text');
                res.send(option.result.toString());
            }
        }, option.timeout);
    });
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
    if (len === 0) {
        return cgiMock;
    } if (len === 1) {
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
    return path.join(global.cgiMockFilePath, value);
}


// log proxy data
proxy.on('open', (proxySocket) => {
    proxySocket.on('data', (chunk) => {
        console.log(chunk.toString());
    });
});
proxy.on('proxyRes', (proxyRes) => {
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
    const cookie = proxyRes.headers['set-cookie'];
    if (cookie && cookie.length > 0) {
        for (let i = 0; i < cookie.length; i++) {
            cookie[i] = cookie[i].replace('Secure', '');
        }
    }
});

proxy.on('error', (e) => {
    console.log(e);
});

// 规则之外的请求转发
cgiMock.proxy = function (host) {
    process.nextTick(() => {
        global.router.use((req, res) => {
            proxy.web(req, res, {
                target: host,
                secure: false
            });
        });
    });
    proxy.on('proxyReq', (proxyReq) => {
        proxyReq.setHeader('Host', url.parse(host).host);
    });
};

// 读取文件内容
cgiMock.file = function (file) {
    return fs.readFileSync(parsePath(file));
};

cgiMock.prefix = '/';

module.exports = cgiMock;
