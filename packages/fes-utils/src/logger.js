import chalk from 'chalk';

export const prefixes = {
    wait: `${chalk.cyan('wait')}  -`,
    error: `${chalk.red('error')} -`,
    warn: `${chalk.yellow('warn')}  -`,
    ready: `${chalk.green('ready')} -`,
    info: `${chalk.cyan('info')}  -`,
    event: `${chalk.magenta('event')} -`,
    debug: `${chalk.gray('debug')} -`,
};

export function wait(...message) {
    console.log(prefixes.wait, ...message);
}

export function error(...message) {
    console.error(prefixes.error, ...message);
}

export function warn(...message) {
    console.warn(prefixes.warn, ...message);
}

export function ready(...message) {
    console.log(prefixes.ready, ...message);
}

export function info(...message) {
    console.log(prefixes.info, ...message);
}

export function event(...message) {
    console.log(prefixes.event, ...message);
}
