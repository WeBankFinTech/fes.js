module.exports = function ({ cgiMock, mockjs, utils }) {
    const { Random } = mockjs;

    // 测试 proxy 与 mock 用例集合
    cgiMock('/movie/in_theaters_mock', (req, res) => {
        res.send(JSON.stringify({
            code: '0',
            msg: '',
            result: {
                text: 'movie:  movie/in_theaters_mock ~~~~~'
            }
        }));
    });
    cgiMock('/movie/test_mock', (req, res) => {
        res.send(JSON.stringify({
            code: '0',
            msg: '',
            result: {
                text: 'mock:  movie/test_mock'
            }
        }));
    });

    // 测试用例: mock.js change，重现请求，需要能拉最新的数据
    cgiMock('/watchtest', (req, res) => {
        res.send(JSON.stringify({
            code: '0',
            msg: '',
            result: {
                text: '通过 register 测试 mock watch: 初始状态'
            }
        }));
    });

    // 返回一个数字
    // cgiMock('/number', 666);
    cgiMock('/number', 999);

    // 返回一个json
    cgiMock({
        url: '/json',
        result: {
            code: '400101', msg: "不合法的请求:Missing cookie 'wb_app_id' for method parameter of type String", transactionTime: '20170309171146', success: false
        }
    });

    // 利用 mock.js 产生随机文本
    cgiMock('/text', Random.cparagraph());

    // 返回一个字符串 利用 mock.js 产生随机字符
    cgiMock('/random', mockjs.mock({
        'string|1-10': '★'
    }));

    // 正则匹配url, 返回一个字符串
    cgiMock(/\/abc|\/xyz/, 'regexp test!');

    // option.result 参数如果是一个函数, 可以实现自定义返回内容, 接收的参数是是经过 express 封装的 req 和 res 对象.
    cgiMock(/\/function$/, (req, res) => {
        res.send('function test');
    });

    // 返回文本 readFileSync
    cgiMock('/file', utils.file('./package.json'));

    // 更复杂的规则配置
    cgiMock({
        url: /\/who/,
        method: 'GET',
        result(req, res) {
            if (req.query.name === 'kwan') {
                res.json({ kwan: '孤独患者' });
            } else {
                res.send('Nooooooooooo');
            }
        },
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': '123',
            ETag: '12345'
        },
        cookies: [
            {
                name: 'myname', value: 'kwan', maxAge: 900000, httpOnly: true
            }
        ]
    });

    // 携带参数的请求
    cgiMock('/v2/audit/list', (req, res) => {
        const {
            currentPage, pageSize, isAudited
        } = req.body;
        res.send({
            code: '0',
            msg: '',
            data: {
                currentPage,
                pageSize,
                totalPage: 2,
                totalCount: 12,
                pageData: Array.from({ length: pageSize }, () => ({
                    title: Random.title(),
                    authorName: Random.cname(),
                    authorId: Random.name(),
                    createTime: Date.now(),
                    updateTime: Date.now(),
                    readCount: Random.integer(60, 1000),
                    favoriteCount: Random.integer(1, 50),
                    postId: '12323',
                    serviceTag: '业务类型',
                    productTag: '产品类型',
                    requestTag: '需求类型',
                    handleTag: '已采纳',
                    postType: 'voice',
                    postStatus: isAudited ? 'pass' : 'auditing',
                    auditStatus: 'audit1'
                }))
            }
        });
    });

    // multipart/form-data 类型
    cgiMock('/v2/upload', (req, res) => {
        res.send({
            code: '0',
            msg: '文件上传成功'
        });
    });
};
