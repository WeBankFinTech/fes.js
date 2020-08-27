# Mock API
在项目根目录mock.js文件中配置mock接口返回的数据

mock.js文件示例

```javascript
module.exports = function(cgiMock, Mock, faker) {
    //前缀，全局（可选）
    cgiMock.prefix = '';

    // 返回一个数字
    cgiMock('/number', 123);

    // 返回一个json
    cgiMock({
        url: '/json',
        result: {"code":"400101","msg":"不合法的请求:Missing cookie 'wb_app_id' for method parameter of type String","transactionTime":"20170309171146","success":false}
    });

    //利用mock.js 产生随机文本
    var Random = Mock.Random;
    cgiMock('/text', Random.cparagraph());

    // 返回一个字符串 利用mock.js 产生随机字符
    cgiMock('/string', Mock.mock({
        "string|1-10": "★"
    }));


    // 正则匹配url, 返回一个字符串
    cgiMock(/\/abc|\/xyz/, 'regexp test!');

    // option.result 参数如果是一个函数, 可以实现自定义返回内容, 接收的参数是是经过 express 封装的 req 和 res 对象.
    cgiMock(/\/function$/, function (req, res) {
        res.send('function test');
    });

    // 返回文本 fs.readFileSync
    cgiMock('/file', cgiMock.file('./test.json'));

    // 更复杂的规则配置
    cgiMock({
        url: /\/who/,
        method: 'GET',
        result: function (req, res) {
            if (req.query.name === 'kwan') {
                res.json({'kwan': '孤独患者'});
            }
            else {
                res.send('Nooooooooooo');
            }
        },
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': '123',
            'ETag': '12345'
        },
        cookies: [
            {name: 'myname', value: 'kwan', maxAge: 900000, httpOnly: true}
        ],
        //接口随机延迟
        timeout: Mock.mock({
            "number|1000-5000": 1000
        }).number
    });

    //登录 该用法可以实现自定义返回内容, 接收的参数是是经过 express 封装的 req 和 res 对象.
    cgiMock('/login', function (req, res) {
        res.send(JSON.stringify({
            code: "0",
            msg: "",
            result: {
                username: "万纯（harrywan）",
                roleName: "管理员"
            }
        }))
    });

    cgiMock('/getTestList', function (req, res) {
        var list = [];
        for(var i=0; i<req.body.pageSize; i++){
            list.push({
                a: i
            })
        }
        res.send(JSON.stringify({
            code: "0",
            msg: "this is message",
            result: {
                list: list,
                page: {
                    pageSize: req.body.pageSize,
                    currentPage: req.body.currentPage,
                    totalPage: 1000
                }
            }

        }))
    });

    cgiMock('/getNumber', function (req, res) {
        var max = req.body.max;
        var min = req.body.min;
        res.send(JSON.stringify({
            code: "0",
            msg: "this is message",
            result:  4
        }))
    });

    cgiMock('/getRoleName', function (req, res) {
        res.send(JSON.stringify({
            code: "0",
            msg: "this is message",
            result:  'admin'
        }))
    });
}
```