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

commander
    .command('test:unit')
    .description('单元测试')
    .option('--port', '<integer> Port where the server is running.')
    .option('--auto-watch', 'Auto watch source files and run on change.')
    .option('--detached', 'Detach the server.')
    .option('--no-auto-watch', 'Do not watch source files.')
    .option('--log-level', '<disable | error | warn | info | debug> Level of logging.')
    .option('--colors', 'Use colors when reporting and printing logs.')
    .option('--no-colors', 'Do not use colors when reporting or printing logs.')
    .option('--reporters', 'List of reporters (available: dots, progress, junit, growl, coverage).')
    .option('--browsers', 'List of browsers to start (eg. --browsers Chrome,ChromeCanary,Firefox).')
    .option('--capture-timeout', '<integer> Kill browser if does not capture in given time [ms].')
    .option('--single-run', 'Run the test when browsers captured and exit.')
    .option('--no-single-run', 'Disable single-run.')
    .option('--report-slower-than', '<integer> Report tests that are slower than given time [ms].')
    .option('--fail-on-empty-test-suite', 'Fail on empty test suite.')
    .option('--no-fail-on-empty-test-suite', 'Do not fail on empty test suite.')
    .option('--fail-on-failing-test-suite', 'Fail on failing test suite.')
    .option('--no-fail-on-failing-test-suite', 'Do not fail on failing test suite.')
    .option('--coverage', '是否进行覆盖测试')
    .action((options) => {
        const test = require('../build/tasks/test');
        const config = generateConfig('build', commander.env || 'dev');
        test(config, process.argv.slice(3), {
            coverage: options.coverage
        });
    });

commander.parse(process.argv);


if (!process.argv.slice(2).length) {
    commander.outputHelp((text) => {
        log.message(text);
        return '';
    });
}
