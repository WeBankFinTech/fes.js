import {
    chalk,
    yParser
} from '@umijs/utils';
import {
    Service
} from './serviceWithBuiltIn';
import fork from './utils/fork';
import getCwd from './utils/getCwd';
import getPkg from './utils/getPkg';

// process.argv: [node, fes.js, command, args]
const args = yParser(process.argv.slice(2), {
    alias: {
        version: ['v'],
        help: ['h']
    },
    boolean: ['version']
});

// TODO version 命令
if (args.version && !args._[0]) {
    args._[0] = 'version';
    console.log(`fes@${require('../package.json').version}`);
} else if (!args._[0]) {
    // TODO 帮助命令
    args._[0] = 'help';
}

(async () => {
    try {
        switch (args._[0]) {
            case 'dev':
                // eslint-disable-next-line
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
                break;
            default:
                // eslint-disable-next-line
                const name = args._[0];
                if (name === 'build') {
                    process.env.NODE_ENV = 'production';
                }
                await new Service({
                    cwd: getCwd(),
                    pkg: getPkg(process.cwd())
                }).run({
                    name,
                    args
                });
                break;
        }
    } catch (e) {
        console.error(chalk.red(e.message));
        console.error(e.stack);
        process.exit(1);
    }
})();
