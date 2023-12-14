import process from 'node:process';
import { chalk, semver, yParser } from '@fesjs/utils';
import fesPkg from '../package.json';
import { Service } from './serviceWithBuiltIn';
import fork from './utils/fork';
import getCwd from './utils/getCwd';
import getPkg from './utils/getPkg';
import { hackFesInBuild } from './hackFesInBuild';

const requiredVersion = fesPkg.engines.node;

function checkNodeVersion(wanted, id) {
    if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
        // eslint-disable-next-line no-console
        console.log(chalk.red(`You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.\nPlease upgrade your Node version.`));
        process.exit(1);
    }
}

checkNodeVersion(requiredVersion, '@fesjs/fes');

const rawArgv = process.argv.slice(2);
const args = yParser(rawArgv);

(async () => {
    try {
        const command = args._[0];
        if (command === 'dev') {
            const child = fork({
                scriptPath: require.resolve('./forkedDev'),
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
        }
        else {
            hackFesInBuild();
            if (command === 'build')
                process.env.NODE_ENV = 'production';

            await new Service({
                cwd: getCwd(),
                pkg: getPkg(process.cwd()),
                fesPkg,
            }).run({
                args,
                rawArgv,
            });
        }
    }
    catch (e) {
        console.error(chalk.red(e.message));
        console.error(e.stack);
        process.exit(1);
    }
})();
