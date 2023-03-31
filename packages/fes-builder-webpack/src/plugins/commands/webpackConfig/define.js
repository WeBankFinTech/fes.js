import webpack from 'webpack';
import { resolveRuntimeEnv, stringifyObjValue } from '@fesjs/utils';

export default function createDefineWebpackConfig({ config, publicPath, webpackConfig }) {
    const env = stringifyObjValue(resolveRuntimeEnv(publicPath));

    const define = stringifyObjValue({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        ...config.define,
    });

    webpackConfig.plugin('define').use(webpack.DefinePlugin, [
        {
            'process.env': env,
            ...define,
        },
    ]);
}
