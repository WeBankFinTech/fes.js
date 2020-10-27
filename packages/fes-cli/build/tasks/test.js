const fs = require('fs-extra');
const execa = require('execa');
const path = require('path');
const log = require('../helpers/log');

module.exports = function (config, rawArgv) {
    const testDir = path.join(config.folders.PROJECT_DIR, 'test');
    if (fs.pathExistsSync(testDir)) {
        const bin = require.resolve('mochapack/bin/mochapack');
        const argv = [
            // ...nodeArgs,
            bin,
            '--recursive',
            '--require',
            require.resolve('../helpers/setup.js'),
            '--webpack-config',
            require.resolve('../configs/webpack.test.config.js'),
            ...rawArgv,
            `${testDir}/**/*.spec.js`
        ];
        const child = execa('node', argv, {
            cwd: config.folders.CLI_DIR,
            encoding: 'utf8',
            stdio: 'inherit'
        });
        child.on('error', (e) => {
            log.error('[ERROR] test命令执行失败');
            log.error(JSON.stringify(e));
        });
        child.on('exit', (code) => {
            if (code !== 0) {
                log.message(`[fes] mochapack进程退出，code ${code}.`);
            }
        });
    } else {
        log.warn('[WRAN] 测试目录不存在，请在项目根目录创建目录test');
    }
};
