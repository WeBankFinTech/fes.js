/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/blob/master/packages/umi/src/forkedDev.ts
 */
import process from 'node:process';
import { chalk, yParser } from '@fesjs/utils';
import fesPkg from '../package.json';
import { Service } from './serviceWithBuiltIn';
import getCwd from './utils/getCwd';
import getPkg from './utils/getPkg';
import { hackFesInBuild } from './hackFesInBuild';

const args = yParser(process.argv.slice(2));

let closed = false;
function onSignal(signal, service) {
    if (closed)
        return;
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

(async () => {
    try {
        process.env.NODE_ENV = 'development';
        hackFesInBuild();
        const service = new Service({
            cwd: getCwd(),
            pkg: getPkg(process.cwd()),
            fesPkg,
        });
        await service.run({
            name: 'dev',
            args,
        });

        // kill(2) Ctrl-C
        process.once('SIGINT', () => onSignal('SIGINT', service));
        // kill(3) Ctrl-\
        process.once('SIGQUIT', () => onSignal('SIGQUIT', service));
        // kill(15) default
        process.once('SIGTERM', () => onSignal('SIGTERM', service));
    }
    catch (e) {
        console.error(chalk.red(e.message));
        console.error(e.stack);
        process.exit(1);
    }
})();
