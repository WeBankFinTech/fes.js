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

export function wait(...message: any[]): void {
    // eslint-disable-next-line no-console
    console.log(prefixes.wait, ...message);
}

export function error(...message: any[]): void {
    console.error(prefixes.error, ...message);
}

export function warn(...message: any[]): void {
    console.warn(prefixes.warn, ...message);
}

export function ready(...message: any[]): void {
    // eslint-disable-next-line no-console
    console.log(prefixes.ready, ...message);
}

export function info(...message: any[]): void {
    // eslint-disable-next-line no-console
    console.log(prefixes.info, ...message);
}

export function event(...message: any[]): void {
    // eslint-disable-next-line no-console
    console.log(prefixes.event, ...message);
}
