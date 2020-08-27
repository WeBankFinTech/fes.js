var express = require('express');
var fs = require('fs');
var path = require('path');
var httpProxy = require('http-proxy');

var util = require('./util');
var proxy = httpProxy.createProxyServer();
global.router = express.Router();

// 根据参数个数获取配置
function getOption(arg) {
    var len = arg.length;
    // 默认配置
    var option = {
        headers: {
            'Cache-Control': 'no-cache'
        },
        statusCode: 200,
        cookies: [],
        timeout: 0
    };
    if (len === 0) {
        return cgiMock;
    } else if (len === 1) {
        var newOption = arg[0];
        if (util.isObject(newOption)) {
            util.each(newOption, function (value, key) {
                if (key === 'headers') {
                    util.each(newOption.headers, function (headervalue, headerkey) {
                        option.headers[headerkey] = newOption.headers[headerkey];
                    })
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
proxy.on('open', function (proxySocket) {
    proxySocket.on('data', function (chunk) {
        console.log(chunk.toString());
    });
});
proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

proxy.on('error', function (e) {
    console.log(e);
});

/**
 * 数据模拟函数
 */
function cgiMock() {

    var option = getOption(arguments);

    if (!option.url || !option.result) {
        return;
    }

    // option.method is one of ['get','post','delete','put'...]
    var method = option.method || 'use';

    global.router[method.toLowerCase()](option.url, function (req, res) {
        setTimeout(function () {

            // set header
            res.set(option.headers);

            // set Content-Type
            option.type && res.type(option.type);

            // set status code
            res.status(option.statusCode);

            // set cookie
            util.each(option.cookies, function (item, index) {
                var name = item.name;
                var value = item.value;
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

// 规则之外的请求转发
cgiMock.proxy = function (host) {
    process.nextTick(function () {
        global.router.use(function (req, res) {
            proxy.web(req, res, {
                target: host,
                secure: false
            });
        });
    });
}

// 读取文件内容
cgiMock.file = function (file) {
    return fs.readFileSync(parsePath(file));
}

cgiMock.prefix = '/';

module.exports = cgiMock;
