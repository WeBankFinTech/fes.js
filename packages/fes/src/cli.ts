import type { CliArgs } from './types';
import { join } from 'node:path';
import process from 'node:process';
import { chalk, semver, yParser } from '@fesjs/utils';
import fesPkg from '../package.json';
import { Service } from './serviceWithBuiltIn';
import fork from './utils/fork';
import getCwd from './utils/getCwd';
import getPkg from './utils/getPkg';
import { OWNER_DIR } from './utils/shared';

const requiredVersion = fesPkg.engines.node;

function checkNodeVersion(wanted: string, id: string): void {
    if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
        console.log(chalk.red(`You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.\nPlease upgrade your Node version.`));
        process.exit(1);
    }
}

checkNodeVersion(requiredVersion, '@fesjs/fes');

const rawArgv: string[] = process.argv.slice(2);
const args: CliArgs = yParser(rawArgv);

export async function main(): Promise<void> {
    try {
        const command = args._[0] as string;
        if (command === 'dev') {
            const child = fork({
                scriptPath: join(OWNER_DIR, 'dist', 'forkedDev.mjs'),
            });
            // http://nodejs.cn/api/process/signal_events.html
            process.on('SIGINT', () => {
                child.kill('SIGINT');
                process.exit();
            });
            process.on('SIGTERM', () => {
                child.kill('SIGTERM');
                process.exit();
            });
        }
        else {
            if (command === 'build') {
                process.env.NODE_ENV = 'production';
            }

            const service = await new Service({
                cwd: getCwd(),
                pkg: getPkg(process.cwd()),
                fesPkg,
            });
            await service.ready;
            service.run({
                args,
                rawArgv,
            });
        }
    }
    catch (e: any) {
        console.error(chalk.red(e.message));
        console.error(e.stack);
        process.exit(1);
    }
}
