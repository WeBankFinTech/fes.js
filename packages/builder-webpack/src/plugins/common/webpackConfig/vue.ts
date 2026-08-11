import type Config from 'webpack-5-chain';
import type { WebpackBuildConfig } from '../../../shared';
import { join } from 'node:path';
import { esmRequire, esmResolve, OWNER_DIR } from '../../../shared';

interface CreateVueWebpackConfigOptions {
    config: WebpackBuildConfig;
    webpackConfig: Config;
}

export default function createVueWebpackConfig({ config, webpackConfig }: CreateVueWebpackConfigOptions) {
    webpackConfig.module
        .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
        .loader(esmResolve('vue-loader'))
        .options({
            babelParserPlugins: ['jsx', 'classProperties', 'decorators-legacy'],
            ...(config as any).vueLoader || {},
        })
        .end();

    webpackConfig.module
        .rule('vue-custom')
        .resourceQuery((query: string) => {
            if (!query) {
                return false;
            }
            return query.startsWith('?vue&type=custom');
        })
        .use('vue-custom-loader')
        .loader(join(OWNER_DIR, './pitcher.mjs'));

    webpackConfig.plugin('vue-loader-plugin').use(esmRequire('vue-loader').VueLoaderPlugin);
}
