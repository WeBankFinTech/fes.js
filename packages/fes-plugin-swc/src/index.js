import { join } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { buildSwcOptions } from './swcOptions';

const DEFAULT_EXCLUDE_NODE_MODULES = [
    'vue',
    'vuex',
    'vue-router',
    'core-js',
    'echarts',
    '@babel/runtime',
    'lodash-es',
    'webpack-dev-server',
    'ansi-html',
    'html-entities',
];

function genTranspileDepRegex(exclude) {
    exclude = exclude.concat(DEFAULT_EXCLUDE_NODE_MODULES);
    const deps = exclude.map((dep) => {
        if (typeof dep === 'string') {
            const depPath = join('node_modules', dep, '/');
            return /^win/.test(require('os').platform()) ? depPath.replace(/\\/g, '\\\\') : depPath;
        }
        if (dep instanceof RegExp) {
            return dep.source;
        }

        throw new Error('exclude only accepts an array of string or regular expressions');
    });
    return deps.length ? new RegExp(deps.join('|')) : null;
}

export default (api) => {
    api.describe({
        key: 'swc',
        config: {
            schema(joi) {
                return joi.object({
                    loader: joi.object().description('more swc options see https://github.com/swc-project/swc-loader'),
                });
            },
        },
    });

    if (api.builder.name === 'vite') {
        // vite 不需要处理
    } else {
        api.chainWebpack((webpackConfig, { targets, env }) => {
            const isProd = env === 'production';
            const config = api.config;

            //清除babel配置
            webpackConfig.module.rules.delete('js');

            webpackConfig.module
                .rule('js')
                .test(/\.(js|mjs)$/)
                // Don't transpile node_modules
                .exclude.add(/node_modules/)
                .end()
                .use('swc-loader')
                .loader(require.resolve('swc-loader'))
                .options(buildSwcOptions(targets, config, false, false));

            webpackConfig.module
                .rule('jsx')
                .test(/\.jsx$/)
                .exclude.add(/node_modules/)
                .end()
                .use('swc-loader')
                .loader(require.resolve('swc-loader'))
                .options(buildSwcOptions(targets, config, true, false));

            webpackConfig.module
                .rule('ts')
                .test(/\.ts$/)
                .exclude.add(/node_modules/)
                .end()
                .use('swc-loader')
                .loader(require.resolve('swc-loader'))
                .options(buildSwcOptions(targets, config, false, true));

            webpackConfig.module
                .rule('tsx')
                .test(/\.tsx$/)
                .exclude.add(/node_modules/)
                .end()
                .use('swc-loader')
                .loader(require.resolve('swc-loader'))
                .options(buildSwcOptions(targets, config, true, true));

            // 为了避免第三方依赖包编译不充分导致线上问题，默认对 node_modules 也进行全编译，只在生产构建的时候进行
            if (isProd) {
                webpackConfig.module.rules.delete('js-in-node_modules');

                // const cjsReg = [/css-loader/, /vue-loader/].concat(config.swcLoader?.cjsPkg || []);
                const transpileDepRegex = genTranspileDepRegex(config.nodeModulesTransform.exclude);
                webpackConfig.module
                    .rule('js-in-node_modules')
                    .test(/\.(js|mjs)$/)
                    .include.add(/node_modules/)
                    .end()
                    .exclude.add((filepath) => {
                        if (transpileDepRegex && transpileDepRegex.test(filepath)) {
                            return true;
                        }
                        return false;
                    })
                    .end()
                    .use('swc-loader')
                    .loader(require.resolve('swc-loader'))
                    .options(buildSwcOptions(targets, config, false, false));

                const swcOptions = buildSwcOptions(targets, config, false, false, true);
                webpackConfig.optimization.minimizer('css').tap((args) => [...args, { minify: CssMinimizerPlugin.swcMinify }]);
                webpackConfig.optimization
                    .minimizer('terser')
                    .tap((args) => [...args, { terserOptions: swcOptions.jsc?.minify, minify: TerserPlugin.swcMinify }]);
            }

            return webpackConfig;
        });
    }
};
