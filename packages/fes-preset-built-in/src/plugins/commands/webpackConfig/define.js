import webpack from 'webpack';
import resolveDefine from './resolveDefine';

export default function createDefineWebpackConfig({
    config,
    webpackConfig
}) {
    webpackConfig.plugin('define')
        .use(webpack.DefinePlugin, [
            resolveDefine(config)
        ]);
}
