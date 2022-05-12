import { resolveRuntimeEnv, stringifyObjValue } from '@fesjs/utils';

export default (api, publicPath) => {
    const viteOption = api.config.viteOption;
    const env = resolveRuntimeEnv(publicPath);

    const define = stringifyObjValue({
        ...api.config.define,
        ...viteOption.define,
    });

    return {
        'process.env': env,
        ...define,
    };
};
