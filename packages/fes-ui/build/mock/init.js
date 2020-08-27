const Mock = require('mockjs');
const faker = require('faker');
const path = require('path');
const fs = require('fs');

const logger = require('morgan');
const multer = require('multer');
const bodyParser = require('body-parser');
const onFinished = require('on-finished');

const util = require('./util');
const cgiMock = require('./cgiMock');
const log = require('./log');

const main = {

    init(app, argv, cwd) {
        this.app = app;
        this.argv = argv;
        this.cwd = cwd;

        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        const upload = multer();
        app.post('/upload', upload.single('upFiles'), (req, res, next) => {
            // req.file 是 `avatar` 文件的信息
            // req.body 将具有文本域数据，如果存在的话
            console.log(req.file);
            console.log(req.body);
            res.send(JSON.stringify({
                code: '0',
                msg: 'this is message',
                result: {
                    url: ''
                }

            }));
        });

        this.customRoute();
        this.defaultRoute();
    },

    customRoute() {
        const argv = this.argv;
        let defaultCgiMockFile = '';
        const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
        defaultCgiMockFile = path.join(process.cwd(), '/mock.js');

        let cgiMockFile;
        if (argv) {
            if (argv.f) {
                if (process.platform === 'win32') {
                    cgiMockFile = path.resolve(this.cwd, this.argv.f);
                } else if (argv.f[0] === '~') {
                    cgiMockFile = path.resolve(home, argv.f.replace(/^~\//, ''));
                } else {
                    cgiMockFile = path.resolve(this.cwd, this.argv.f);
                }
            } else {
                cgiMockFile = defaultCgiMockFile;
            }
        } else {
            cgiMockFile = defaultCgiMockFile;
        }
        global.cgiMockFilePath = path.resolve(cgiMockFile, '..');

        const loadRouteConfig = function () {
            util.cleanCache(cgiMockFile);
            try {
                if (!fs.existsSync(cgiMockFile)) {
                    log.error('[WARN] 不存在mock.js文件');
                } else if (util.isFunction(require(cgiMockFile))) {
                    global.router.stack = [];
                    require(cgiMockFile)(cgiMock, Mock, faker);
                    log.message('[SUCCESS] mock.js 加载成功');
                } else {
                    log.error(`[ERROR] mock.js cannot be ${typeof (require(cgiMockFile))}`);
                }
            } catch (e) {
                log.error('[ERROR] mock.js 有误，请检查');
                log.error(JSON.stringify(e));
            }
        };

        loadRouteConfig();
        this.app.use(cgiMock.prefix, (req, res, next) => {
            // var mockContent = require(cgiMockFile);
            onFinished(res, (err, res) => {
                // console.log(mockContent.toString());
                loadRouteConfig();
            });
            global.router(req, res, next);
        });

        util.watchFile(cgiMockFile, () => {
            log.message('[INFO] mock/app.js 发生变化');
            loadRouteConfig();
            log.message('[SUCCESS] mock/app.js UPDATED!');
        });
    },

    defaultRoute() {
        const app = this.app;

        setTimeout(() => {
            // app.use(function (req, res, next) {
            //     var err = new Error('Not Found');
            //     err.status = 404;
            //     next(err);
            // });
            app.use((err, req, res, next) => {
                res.json({
                    status: err.status || 500,
                    message: err.message,
                    err
                });
            });
        });
    }
};

module.exports = main.init.bind(main);
