import path from 'path';
import { chalk } from '@fesjs/utils';
import validateProjectName from 'validate-npm-package-name';
import fs from 'fs-extra';
import inquirer from 'inquirer';

import { clearConsole } from './utils';
import AppGenerator from './generator/App';
import PluginGenerator from './generator/Plugin';

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
        result.errors &&
            result.errors.forEach((err) => {
                console.error(chalk.red.dim(`Error: ${err}`));
            });
        result.warnings &&
            result.warnings.forEach((warn) => {
                console.error(chalk.red.dim(`Warning: ${warn}`));
            });
        throw new Error('Process exited');
    }
    if (fs.pathExistsSync(targetDir) && !args.merge) {
        if (args.force) {
            await fs.remove(targetDir);
        } else if (inCurrent) {
            clearConsole();
            const { ok } = await inquirer.prompt([
                {
                    name: 'ok',
                    type: 'confirm',
                    message: 'Generate project in current directory?',
                },
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
                        { name: 'Cancel', value: false },
                    ],
                },
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
                { name: 'Plugin, suitable for fes plugin', value: 'plugin' },
                { name: 'Cancel', value: false },
            ],
        },
    ]);

    if (template === 'pc' || template === 'h5') {
        const generator = new AppGenerator({
            cwd,
            args,
            targetDir,
            path: path.join(__dirname, `../templates/app/${template}`),
        });
        await generator.run();
        console.log();
        console.log(chalk.green(`project ${projectName} created successfully, please execute the following command to use:`));
        console.log(`$ cd ${projectName}`);
        console.log('$ pnpm i');
        console.log('$ pnpm dev');
        console.log();
    } else if (template === 'plugin') {
        const generator = new PluginGenerator({
            cwd,
            args,
            targetDir,
            path: path.join(__dirname, '../templates/plugin'),
            name,
        });
        await generator.run();
        console.log();
        console.log(chalk.green(`plugin ${projectName} created successfully, please execute the following command to use:`));
        console.log(`$ cd ${projectName}`);
        console.log('$ pnpm i');
        console.log('$ pnpm dev');
        console.log();
    }
};
