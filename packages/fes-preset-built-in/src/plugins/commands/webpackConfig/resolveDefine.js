const prefixRE = /^FES_APP_/;

const ENV_SHOULD_PASS = ['NODE_ENV', 'FES_ENV', 'HMR', 'SOCKET_SERVER', 'ERROR_OVERLAY'];

export default function resolveDefine(opts = {}, raw) {
    const env = {};
    Object.keys(process.env).forEach((key) => {
        if (prefixRE.test(key) || ENV_SHOULD_PASS.includes(key)) {
            env[key] = process.env[key];
        }
    });

    if (raw) {
        return env;
    }

    for (const key in env) {
        if (Object.prototype.hasOwnProperty.call(env, key)) {
            env[key] = JSON.stringify(env[key]);
        }
    }

    const define = {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        ...opts.define
    };

    for (const key in define) {
        if (Object.prototype.hasOwnProperty.call(define, key)) {
            define[key] = JSON.stringify(define[key]);
        }
    }

    return {
        'process.env': env,
        ...define
    };
}
