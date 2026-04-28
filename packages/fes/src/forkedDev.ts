import type { ServiceInstance } from '@fesjs/compiler';
import type { DevArgs } from './types';
import process from 'node:process';
import pc from 'picocolors';
import { yParser } from '@fesjs/utils';
import fesPkg from '../package.json';
import { Service } from './serviceWithBuiltIn';
import getCwd from './utils/getCwd';
import getPkg from './utils/getPkg';

const args: DevArgs = yParser(process.argv.slice(2));

let closed = false;
function onSignal(signal: string, service: ServiceInstance): void {
    if (closed) {
        return;
    }
    closed = true;

    // 退出时触发插件中的onExit事件
    service.applyPlugins({
        key: 'onExit',
        type: service.ApplyPluginsType.event,
        args: {
            signal,
        },
    });
    process.exit(0);
}

(async (): Promise<void> => {
    try {
        process.env.NODE_ENV = 'development';
        const service = new Service({
            cwd: getCwd(),
            pkg: getPkg(process.cwd()),
            fesPkg,
        });
        await service.ready;
        await service.run({
            args,
        });

        // kill(2) Ctrl-C
        process.once('SIGINT', () => onSignal('SIGINT', service));
        // kill(3) Ctrl-\
        process.once('SIGQUIT', () => onSignal('SIGQUIT', service));
        // kill(15) default
        process.once('SIGTERM', () => onSignal('SIGTERM', service));
    }
    catch (e: any) {
        console.error(pc.red(e.message));
        console.error(e.stack);
        process.exit(1);
    }
})();
