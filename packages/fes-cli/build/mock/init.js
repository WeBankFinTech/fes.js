const Mock = require('mockjs');
const faker = require('faker');
const path = require('path');
const fs = require('fs');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const onFinished = require('on-finished');

const util = require('./util');
const cgiMock = require('./cgiMock');
const log = require('../helpers/log');

const main = {
    init(app, argv, cwd) {
        this.app = app;
        this.argv = argv;
        this.cwd = cwd;

        app.use(logger('dev'));
        app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
        app.use(cookieParser());

        this.customRoute();
    },

    customRoute() {
        const argv = this.argv;
        const defaultCgiMockFile = path.join(process.cwd(), 'mock.js');
        const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

        let cgiMockFile;
        if (argv) {
            if (argv.f) {
                if (process.platform === 'win32') {
                    cgiMockFile = path.resolve(this.cwd, this.argv.f);
                } else if (argv.f[0] === '~') {
                    cgiMockFile = path.resolve(
                        home,
                        argv.f.replace(/^~\//, '')
                    );
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
                } else {
                    // eslint-disable-next-line
                    const projectMock = require(cgiMockFile);
                    if (util.isFunction(projectMock)) {
                        global.router.stack = [];
                        projectMock(cgiMock, Mock, faker);
                        log.message('[SUCCESS] mock.js 加载成功');
                    } else {
                        log.error(
                            `[ERROR] mock.js cannot be ${typeof projectMock}`
                        );
                    }
                }
            } catch (e) {
                log.error('[ERROR] mock.js 有误，请检查');
                log.error(JSON.stringify(e));
            }
        };

        loadRouteConfig();
        this.app.use(cgiMock.prefix, (req, res, next) => {
            onFinished(res, () => {
                loadRouteConfig();
            });
            global.router(req, res, next);
        });

        util.watchFile(cgiMockFile, () => {
            log.message('[INFO] mock.js 发生变化');
            loadRouteConfig();
        });
    }
};

module.exports = main.init.bind(main);
