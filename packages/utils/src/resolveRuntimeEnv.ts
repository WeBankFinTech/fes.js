import process from 'node:process';

const prefixRE = /^FES_APP_/;

const ENV_SHOULD_PASS = ['NODE_ENV', 'FES_ENV'];

export default (publicPath: string): Record<string, string | undefined> => {
    const env: Record<string, string | undefined> = {};
    Object.keys(process.env).forEach((key) => {
        if (prefixRE.test(key) || ENV_SHOULD_PASS.includes(key)) {
            env[key] = process.env[key];
        }
    });

    env.BASE_URL = publicPath;

    return env;
};
