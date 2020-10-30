const execa = require('execa');
const log = require('../helpers/log');

module.exports = function (config, rawArgv) {
    const bin = require.resolve('karma/bin/karma');
    const argv = [
        bin,
        'start',
        require.resolve('../configs/karma.conf.js'),
        ...rawArgv
    ];
    const child = execa('node', argv, {
        cwd: config.folders.CLI_DIR,
        env: Object.assign(process.env, { cliPath: config.folders.CLI_DIR }),
        encoding: 'utf8',
        stdio: 'inherit'
    });
    child.on('error', (e) => {
        log.error('[ERROR] test命令执行失败');
        log.error(JSON.stringify(e));
    });
};
