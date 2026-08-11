import pc from 'picocolors';

export const prefixes = {
    wait: `${pc.cyan('wait')}  -`,
    error: `${pc.red('error')} -`,
    warn: `${pc.yellow('warn')}  -`,
    ready: `${pc.green('ready')} -`,
    info: `${pc.cyan('info')}  -`,
    event: `${pc.magenta('event')} -`,
    debug: `${pc.gray('debug')} -`,
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
