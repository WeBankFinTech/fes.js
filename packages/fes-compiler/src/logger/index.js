/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/tree/master/packages/core
 */

import {
    createDebug,
    chalk
} from '@fesjs/utils';
import readline from 'readline';

export default class Logger {
    LOG = chalk.black.bgBlue('LOG');

    INFO = chalk.black.bgBlue('INFO');

    WARN = chalk.black.bgHex('#faad14')('WARN');

    ERROR = chalk.black.bgRed('ERROR');

    PROFILE = chalk.black.bgCyan('PROFILE');

    constructor(namespace) {
        // TODO: get namespace filename accounding caller function
        if (!namespace) {
            throw new Error('logger needs namespace');
        }
        this.namespace = namespace;
        this.profilers = {};
        this.debug = createDebug(this.namespace);
    }

    log(...args) {
        // TODO: node env production
        console.log(this.LOG, ...args);
    }

    /**
     * The {@link logger.info} function is an alias for {@link logger.log()}.
     * @param args
     */
    info(...args) {
        console.log(this.INFO, ...args);
    }

    error(...args) {
        console.error(this.ERROR, ...args);
    }

    warn(...args) {
        console.warn(this.WARN, ...args);
    }

    formatTiming(timing) {
        return timing < 60 * 1000
            ? `${Math.round(timing / 10) / 100}s`
            : `${Math.round(timing / 600) / 100}m`;
    }

    profile(id, message) {
        const time = Date.now();
        const namespace = `${this.namespace}:${id}`;
        // for test
        let msg;
        if (this.profilers[id]) {
            const timeEnd = this.profilers[id];
            delete this.profilers[id];
            process.stderr.write(`${this.PROFILE} `);
            msg = `${this.PROFILE} ${chalk.cyan(
                `└ ${namespace}`
            )} Completed in ${this.formatTiming(time - timeEnd)}`;
            console.log(msg);
        } else {
            msg = `${this.PROFILE} ${chalk.cyan(`┌ ${namespace}`)} ${message || ''}`;
            console.log(msg);
        }

        this.profilers[id] = time;
        return msg;
    }

    clearConsole(title) {
        if (process.stdout.isTTY) {
            const blank = '\n'.repeat(process.stdout.rows);
            console.log(blank);
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
            if (title) {
                console.log(title);
            }
        }
    }
}
