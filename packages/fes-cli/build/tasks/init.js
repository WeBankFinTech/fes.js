const path = require('path');
const fs = require('fs-extra');
const prompts = require('prompts');
const { exec } = require('child_process');
const log = require('../helpers/log');


function createProject(config, projectName) {
    log.message('正在初始化项目...');
    const projectDir = path.resolve(config.folders.PROJECT_DIR, projectName);
    if (fs.pathExistsSync(projectDir)) {
        log.error('该项目已存在，请重新输入！');
        return Promise.reject();
    }
    return new Promise((resolve, reject) => {
        fs.copy(`${config.folders.CLI_DIR}/template`, `${config.folders.PROJECT_DIR}/${projectName}`).then(() => {
            exec(`cd ${config.folders.PROJECT_DIR}/${projectName} && git init && npm i @webank/fes-core @webank/fes-ui && npm i`, (err) => {
                if (err) {
                    log.error(err);
                    reject(err);
                    return;
                }
                log.message(`项目 ${projectName} 创建完成，请执行下面的命令进行使用：`);
                log.message(`$ cd ${projectName}`);
                log.message('$ npm run dev');
                resolve();
            });
        }).catch((err) => {
            log.error(err);
            reject(err);
        });
    });
}

async function initProject(config, projectName) {
    if (projectName) {
        await createProject(config, projectName);
    } else {
        const response = await prompts([
            {
                type: 'text',
                name: 'name',
                message: '请输入项目名称: '
            }
        ]);
        if (!response.name) {
            await initProject(config, projectName);
        } else {
            await createProject(config, response.name);
        }
    }
}

module.exports = initProject;
