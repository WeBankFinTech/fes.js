import { join, relative, resolve } from 'node:path';
import process from 'node:process';
import { defineCommand } from 'citty';
import consola from 'consola';
import ora from 'ora';

import validate from 'validate-npm-package-name';
import pkg from '../package.json' assert { type: 'json' };
import { getWorkPath } from './shared';
import { setupGlobalConsole } from './utils/console';
import { checkEngines } from './utils/engines';
import { copyDirectory } from './utils/gen';

export const main = defineCommand({
    meta: {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
    },
    args: {
        name: {
            type: 'positional',
            description: '项目名称',
            required: true,
        },
        proxy: {
            type: 'string',
            description: '代理地址',
            alias: ['-p'],
        },
        merge: {
            type: 'boolean',
            description: '是否合并',
            alias: ['m'],
        },
        force: {
            type: 'boolean',
            description: '是否强制覆盖',
            alias: ['f'],
        },
    },
    async setup() {
        setupGlobalConsole();
        await checkEngines();
    },
    async run({ args }) {
        const inCurrent = args.name === '.';
        const cwd = getWorkPath();
        const projectName = inCurrent ? relative('../', cwd) : args.name;

        const result = validate(projectName);
        if (!result.validForNewPackages) {
            consola.error(`Invalid project name: "${projectName}"`);
            result.errors
            && result.errors.forEach((err) => {
                consola.error(`Error: ${err}`);
            });
            result.warnings
            && result.warnings.forEach((warn) => {
                consola.warn(`Warning: ${warn}`);
            });
            process.exit(0);
        }

        const template = await consola.prompt('Pick an template:', {
            type: 'select',
            options: [{
                label: 'PC, suitable for management desk front-end applications',
                value: 'pc',
            }, {
                label: 'H5, suitable for mobile applications',
                value: 'h5',
            }, {
                label: 'Plugin, suitable for fes plugin',
                value: 'plugin',
            }, {
                label: 'Cancel',
                value: 'cancel',
            }],
        });

        const targetDir = resolve(cwd, projectName || '.');
        if (template === 'pc' || template === 'h5') {
            const spinner = ora('项目生成中加载中...').start();
            copyDirectory({
                context: {
                    version: pkg.version,
                },
                path: join(__dirname, `../templates/app/${template}`),
                target: targetDir,
            });
            spinner.succeed('项目创建成功');
            consola.box([
                `cd ${projectName}`,
                'pnpm i',
                'pnpm dev',
            ].join('\n'));
        }
        else if (template === 'plugin') {
            copyDirectory({
                context: {
                    version: pkg.version,
                    name: projectName,
                },
                path: join(__dirname, '../templates/plugin'),
                target: targetDir,
            });
            consola.success(`plugin ${projectName} created successfully, please execute the following command to use:`);
            consola.box([
                `cd ${projectName}`,
                'pnpm i',
                'pnpm dev',
            ].join('\n'));
        }
    },
});
