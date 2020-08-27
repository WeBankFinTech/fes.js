const { exec } = require('child_process');
const log = require('../helpers/log');

function update(config) {
    log.message('安装@webank/fes-core @webank/fes-ui...');
    exec(`cd ${config.folders.PROJECT_DIR} && npm i @webank/fes-core @webank/fes-ui --save && npm i`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        log.message('升级完毕');
    });
}

module.exports = update;
