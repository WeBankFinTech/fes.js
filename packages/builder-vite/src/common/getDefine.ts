import type { IPluginAPI } from '@fesjs/shared';
import type { ViteBuildConfig } from '../shared';
import { resolveRuntimeEnv, stringifyObjValue } from '@fesjs/utils';

export default (api: IPluginAPI<ViteBuildConfig>, publicPath: string): Record<string, any> => {
    const viteOption = api.config.vite || api.config.viteOption;
    const env = resolveRuntimeEnv(publicPath);

    const define = stringifyObjValue({
        ...api.config.define,
        ...(viteOption ? viteOption.define : {}),
    });
    const formatEnv = Object.keys(env).reduce((acc, cur) => {
        acc[`process.env.${cur}`] = JSON.stringify(env[cur]);
        return acc;
    }, {} as Record<string, string>);

    return {
        ...formatEnv,
        ...define,
    };
};
