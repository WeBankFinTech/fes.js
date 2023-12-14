import { resolveRuntimeEnv, stringifyObjValue } from '@fesjs/utils';

export default (api, publicPath) => {
    const viteOption = api.config.viteOption;
    const env = resolveRuntimeEnv(publicPath);

    const define = stringifyObjValue({
        ...api.config.define,
        ...viteOption.define,
    });
    const formatEnv = Object.keys(env).reduce((acc, cur) => {
        acc[`process.env.${cur}`] = JSON.stringify(env[cur]);
        return acc;
    }, {});

    return {
        ...formatEnv,
        ...define,
    };
};
