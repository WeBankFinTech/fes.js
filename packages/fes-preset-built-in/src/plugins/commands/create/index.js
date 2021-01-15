import path from 'path';
import { chalk } from '@umijs/utils';
import validateProjectName from 'validate-npm-package-name';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import { Logger } from '@webank/fes-compiler';
import inquirer from 'inquirer';
import tar from 'tar';

const logger = new Logger('fes:plugin-built-in');

export default function (api) {
    api.registerCommand({
        name: 'create',
        description: 'create a new project',
        async fn({ args }) {
            if (args.proxy) {
                process.env.HTTP_PROXY = args.proxy;
            }
            const cwd = args.cwd || process.cwd();
            const projectName = args._[0];
            const inCurrent = projectName === '.';
            const name = inCurrent ? path.relative('../', cwd) : projectName;
            const targetDir = path.resolve(cwd, projectName || '.');

            const result = validateProjectName(name);
            if (!result.validForNewPackages) {
                console.error(chalk.red(`Invalid project name: "${name}"`));
                result.errors && result.errors.forEach((err) => {
                    console.error(chalk.red.dim(`Error: ${err}`));
                });
                result.warnings && result.warnings.forEach((warn) => {
                    console.error(chalk.red.dim(`Warning: ${warn}`));
                });
                throw new Error('Process exited');
            }
            if (fs.existsSync(targetDir) && !args.merge) {
                if (args.force) {
                    await fs.remove(targetDir);
                } else {
                    logger.clearConsole();
                    if (inCurrent) {
                        const { ok } = await inquirer.prompt([
                            {
                                name: 'ok',
                                type: 'confirm',
                                message: 'Generate project in current directory?'
                            }
                        ]);
                        if (!ok) {
                            return null;
                        }
                    } else {
                        const { action } = await inquirer.prompt([
                            {
                                name: 'action',
                                type: 'list',
                                message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
                                choices: [
                                    { name: 'Overwrite', value: 'overwrite' },
                                    { name: 'Merge', value: 'merge' },
                                    { name: 'Cancel', value: false }
                                ]
                            }
                        ]);
                        if (!action) {
                            return null;
                        }
                        if (action === 'overwrite') {
                            console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
                            await fs.remove(targetDir);
                        }
                    }
                }
            }

            const { template } = await inquirer.prompt([
                {
                    name: 'template',
                    type: 'list',
                    message: 'Pick an template:',
                    choices: [
                        { name: 'PC, suitable for management desk front-end applications', value: 'pc' },
                        { name: 'H5, suitable for mobile applications', value: 'h5' },
                        { name: 'Cancel', value: false }
                    ]
                }
            ]);

            if (template) {
                const map = {
                    pc: '@webank/fes-template',
                    h5: '@webank/fes-template-h5'
                };
                fs.mkdirSync(targetDir);
                const stdout = execSync(`npm pack ${map[template]}`, { encoding: 'utf8', stdio: [null] });
                const tempFilePath = path.resolve(cwd, stdout.replace('\n', ''));
                fs.createReadStream(tempFilePath).pipe(
                    tar.x({
                        strip: 1,
                        C: targetDir
                    })
                ).on('finish', () => {
                    fs.removeSync(tempFilePath);
                    console.log();
                    console.log(chalk.green(`project ${projectName} created successfully, please execute the following command to use:`));
                    console.log(`$ cd ${projectName}`);
                    console.log('$ yarn');
                    console.log('$ yarn dev');
                    console.log();
                });
            }
        }
    });
}
