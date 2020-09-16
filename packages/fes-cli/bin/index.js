#!/usr/bin/env node

const commander = require('commander');

const pkg = require('../package.json');
const generateConfig = require('../build/helpers/config');
const log = require('../build/helpers/log');

commander.usage('<command> [options]')
    .version(pkg.version, '-v, --vers')
    .option('-e, --env <env>', '配置环境 local(本地) | sit(测试) | prod(生产)')
    .description(pkg.description);

commander.command('init [name]')
    .description('创建项目')
    .action(async (name) => {
        const projectInit = require('../build/tasks/init');
        const config = generateConfig('init');
        await projectInit(config, name);
    });

commander.command('update')
    .description('将 fes2 项目升级到 fes3')
    .action(() => {
        const update = require('../build/tasks/update');
        const config = generateConfig('update');
        update(config);
    });

commander.command('route')
    .description('根据当前项目结构自动生成 route')
    .action(() => {
        const route = require('../build/tasks/route');
        const config = generateConfig('route');
        route(config);
    });

commander.command('components')
    .description('预编译 src/components 里面的组件')
    .action(() => {
        const components = require('../build/tasks/components');
        const config = generateConfig('components');
        components(config);
    });

commander.command('dev')
    .description('开发调试, 默认 local')
    .action(() => {
        const dev = require('../build/tasks/dev');
        const config = generateConfig('dev', commander.env || 'local');
        dev(config);
    });

commander.command('build')
    .description('打包压缩，默认 prod')
    .action(() => {
        const build = require('../build/tasks/build');
        const config = generateConfig('build', commander.env || 'prod');
        build(config);
    });

commander.parse(process.argv);


if (!process.argv.slice(2).length) {
    commander.outputHelp((text) => {
        log.message(text);
        return '';
    });
}
