import type Config from 'webpack-5-chain';
import type { WebpackBuildConfig } from '../../../shared';
import { resolveRuntimeEnv, stringifyObjValue } from '@fesjs/utils';
import webpack from 'webpack';

interface CreateDefineWebpackConfigOptions {
    config: WebpackBuildConfig;
    publicPath?: string;
    webpackConfig: Config;
}

export default function createDefineWebpackConfig({ config, publicPath, webpackConfig }: CreateDefineWebpackConfigOptions) {
    const env = stringifyObjValue(resolveRuntimeEnv(publicPath || ''));

    const define = stringifyObjValue({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        ...(config as any).define,
    });

    webpackConfig.plugin('define').use(webpack.DefinePlugin, [
        {
            'process.env': env,
            ...define,
        },
    ]);
}
