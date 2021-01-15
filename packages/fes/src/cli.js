import { chalk, yParser, semver } from '@umijs/utils';
import program from 'commander';
import leven from 'leven';
import { Service } from './serviceWithBuiltIn';
import fork from './utils/fork';
import getCwd from './utils/getCwd';
import getPkg from './utils/getPkg';
import fesPkg from '../package.json';

const requiredVersion = fesPkg.engines.node;

function checkNodeVersion(wanted, id) {
    if (
        !semver.satisfies(process.version, wanted, { includePrerelease: true })
    ) {
        console.log(
            chalk.red(
                `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.\nPlease upgrade your Node version.`
            )
        );
        process.exit(1);
    }
}

checkNodeVersion(requiredVersion, '@webank/fes');

function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map(cmd => cmd._name);

    let suggestion;

    availableCommands.forEach((cmd) => {
        const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
        if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
            suggestion = cmd;
        }
    });

    if (suggestion) {
        console.log(`  ${chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`)}`);
    }
}

// process.argv: [node, fes.js, command, args]
const args = yParser(process.argv.slice(2));

program
    .version(`@webank/fes ${fesPkg.version}`, '-v, --vers', 'output the current version')
    .usage('<command> [options]')
    .description(fesPkg.description);

program
    .command('create <app-name>')
    .description('create a new project powered by fes.js')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .option('--merge', 'Merge target directory if it exists')
    .option('-x, --proxy <proxyUrl>', 'Use specified proxy when creating project')
    .action(async () => {
        if (args._.length > 2) {
            console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'));
        }
        try {
            await new Service({
                cwd: getCwd(),
                pkg: getPkg(process.cwd())
            }).run({
                name: 'create',
                args
            });
        } catch (e) {
            console.error(chalk.red(e.message));
            console.error(e.stack);
            process.exit(1);
        }
    });

program
    .command('dev')
    .description('run local http service for development')
    .action(() => {
        try {
            const child = fork({
                scriptPath: require.resolve('./forkedDev')
            });
            // ref:
            // http://nodejs.cn/api/process/signal_events.html
            process.on('SIGINT', () => {
                child.kill('SIGINT');
                process.exit(1);
            });
            process.on('SIGTERM', () => {
                child.kill('SIGTERM');
                process.exit(1);
            });
        } catch (e) {
            console.error(chalk.red(e.message));
            console.error(e.stack);
            process.exit(1);
        }
    });

program
    .command('build')
    .description('compile and package code')
    .action(async () => {
        try {
            process.env.NODE_ENV = 'production';
            await new Service({
                cwd: getCwd(),
                pkg: getPkg(process.cwd())
            }).run({
                name: 'build',
                args
            });
        } catch (e) {
            console.error(chalk.red(e.message));
            console.error(e.stack);
            process.exit(1);
        }
    });

program
    .command('info')
    .description('print debugging information about your environment')
    .action(() => {
        console.log(chalk.bold('\nEnvironment Info:'));
        require('envinfo')
            .run(
                {
                    System: ['OS', 'CPU'],
                    Binaries: ['Node', 'Yarn', 'npm'],
                    Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
                    npmPackages: '/**/{typescript,*vue*,@webank/*/}',
                    npmGlobalPackages: ['@webank/fes']
                },
                {
                    showNotFound: true,
                    duplicates: true,
                    fullTree: true
                }
            )
            .then(console.log);
    });

// output help information on unknown commands
program
    .arguments('[command]')
    .action((cmd) => {
        if (cmd) {
            program.outputHelp();
            console.log(`  ${chalk.red(`Unknown command ${chalk.yellow(cmd)}.`)}`);
            console.log();
            suggestCommands(cmd);
            process.exitCode = 1;
        }
    });

program.on('--help', () => {
    console.log();
    console.log(
        `  Run ${chalk.cyan(
            'fes <command> --help'
        )} for detailed usage of given command.`
    );
    console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
