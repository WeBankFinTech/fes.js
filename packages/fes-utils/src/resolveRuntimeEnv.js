const prefixRE = /^FES_APP_/;

const ENV_SHOULD_PASS = ['NODE_ENV', 'FES_ENV'];

export default (publicPath) => {
    const env = {};
    Object.keys(process.env).forEach((key) => {
        if (prefixRE.test(key) || ENV_SHOULD_PASS.includes(key)) {
            env[key] = process.env[key];
        }
    });

    env.BASE_URL = publicPath;

    return env;
};
