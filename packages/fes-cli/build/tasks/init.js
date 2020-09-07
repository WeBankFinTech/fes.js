const path = require('path');
const fs = require('fs-extra');
const prompts = require('prompts');
const tar = require('tar');
const { execSync } = require('child_process');
const log = require('../helpers/log');


function createProject(config, projectName) {
    log.message('正在初始化项目...');
    const projectDir = path.resolve(config.folders.PROJECT_DIR, projectName);
    if (fs.pathExistsSync(projectDir)) {
        log.error('该项目已存在，请重新输入！');
        return Promise.reject();
    }
    return new Promise((resolve, reject) => {
        const productDir = `${config.folders.PROJECT_DIR}/${projectName}`;
        const stdout = execSync(`npm pack @webank/fes-template`, { encoding: 'utf8', stdio: [null]});
        const filePath = path.resolve(config.folders.PROJECT_DIR, stdout.replace('\n', ''));
        fs.mkdirSync(projectDir);
        fs.createReadStream(filePath).pipe(
            tar.x({
                strip: 1,
                C: productDir // alias for cwd:'some-dir', also ok
            })
        );
        fs.unlinkSync(filePath);
        log.message(`项目 ${projectName} 创建完成，请执行下面的命令进行使用：`);
        log.message(`$ cd ${projectName}`);
        log.message('$ npm i');
        log.message('$ npm run dev');
        resolve();
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
