import path from 'path';
import { chalk } from '@umijs/utils';
import validateProjectName from 'validate-npm-package-name';
import fs from 'fs-extra';
import inquirer from 'inquirer';

import { clearConsole } from './utils';
import AppGenerator from './generator/App';

export default async ({ cwd, args }) => {
    if (args.proxy) {
        process.env.HTTP_PROXY = args.proxy;
    }
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
        } else if (inCurrent) {
            clearConsole();
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
            clearConsole();
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

    clearConsole();
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
        const generator = new AppGenerator({
            cwd,
            args,
            targetDir,
            path: path.join(__dirname, `../templates/app/${template}`)
        });
        await generator.run();
        console.log();
        console.log(chalk.green(`project ${projectName} created successfully, please execute the following command to use:`));
        console.log(`$ cd ${projectName}`);
        console.log('$ yarn');
        console.log('$ yarn dev');
        console.log();
    }
};
