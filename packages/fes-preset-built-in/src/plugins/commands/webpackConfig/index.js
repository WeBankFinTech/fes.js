import { join } from 'path';
import { existsSync } from 'fs';
import Config from 'webpack-chain';
import webpack from 'webpack';
import createCssWebpackConfig from './css';
import getBabelOpts from './getBabelOpts';
import createVueWebpackConfig from './vue';
import createDefineWebpackConfig from './define';
import createMinimizerWebpackConfig from './minimizer';
import createHtmlWebpackConfig from './html';

function getTargetsAndBrowsersList({ config }) {
    let targets = config.targets || {};

    targets = Object.keys(targets)
        .filter(key => targets[key] !== false)
        .reduce((memo, key) => {
            memo[key] = targets[key];
            return memo;
        }, {});

    const browserslist = targets.browsers
      || Object.keys(targets).map(key => `${key} >= ${targets[key] === true ? '0' : targets[key]}`);

    return {
        targets,
        browserslist
    };
}

const DEFAULT_EXCLUDE_NODE_MODULES = [
    'vue',
    'vuex',
    'vue-router',
    'ant-design-vue',
    'core-js',
    'echarts',
    '@babel/runtime',
    'lodash',
    'webpack-dev-server',
    'ansi-html',
    'html-entities'
];

function genTranspileDepRegex(exclude) {
    exclude = exclude.concat(DEFAULT_EXCLUDE_NODE_MODULES);
    const deps = exclude.map((dep) => {
        if (typeof dep === 'string') {
            const depPath = join('node_modules', dep, '/');
            return /^win/.test(require('os').platform()) ? depPath.replace(/\\/g, '\\\\') : depPath;
        } if (dep instanceof RegExp) {
            return dep.source;
        }

        throw new Error('exclude only accepts an array of string or regular expressions');
    });
    return deps.length ? new RegExp(deps.join('|')) : null;
}


export default async function getConfig({
    cwd,
    config,
    env,
    entry = {},
    modifyBabelOpts,
    modifyBabelPresetOpts,
    chainWebpack,
    headScripts,
    publicPath
}) {
    const isDev = env === 'development';
    const isProd = env === 'production';
    const webpackConfig = new Config();
    const absoluteOutput = join(cwd, config.outputPath || 'dist');

    webpackConfig.mode(env);
    webpackConfig.stats('verbose');
    webpackConfig.externals(config.externals || {});
    webpackConfig.devtool(isDev ? (config.devtool || 'cheap-module-source-map') : config.devtool);

    // --------------- cache -----------
    webpackConfig.cache({
        type: 'filesystem',
        cacheDirectory: join(cwd, '.cache/webpack')
    });

    // --------------- entry -----------
    // Feature 公共模块 vue vue-router 处理 dependOn ?
    Object.keys(entry).forEach((key) => {
        webpackConfig.entry(key).add(entry[key]).end();
    });

    // --------------- output -----------
    webpackConfig.output
        .path(absoluteOutput)
        .publicPath(publicPath)
        .filename('[name].[contenthash:8].js')
        .chunkFilename('[name].[contenthash:8].chunk.js');

    // --------------- resolve -----------
    webpackConfig.resolve.extensions.merge(['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm']);

    if (config.alias) {
        Object.keys(config.alias).forEach((key) => {
            webpackConfig.resolve.alias
                .set(key, config.alias[key]);
        });
    }

    // --------------- module -----------
    webpackConfig.module
        .rule('image')
        .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
        .use('url-loader')
        .loader(require.resolve('url-loader'))
        .options({
            limit: config.inlineLimit || 8192,
            esModule: false,
            fallback: {
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/[name].[hash:8].[ext]',
                    esModule: false
                }
            }
        });

    webpackConfig.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader(require.resolve('file-loader'))
        .options({
            name: 'static/[name].[hash:8].[ext]',
            esModule: false
        });

    webpackConfig.module
        .rule('fonts')
        .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
        .use('file-loader')
        .loader(require.resolve('file-loader'))
        .options({
            name: 'static/[name].[hash:8].[ext]',
            esModule: false
        });

    webpackConfig.module
        .rule('raw')
        .test(/\.(txt|text|md)$/)
        .use('raw-loader')
        .loader(require.resolve('raw-loader'))
        .options({
            esModule: false
        });

    const { targets, browserslist } = getTargetsAndBrowsersList({ config });
    const babelOpts = await getBabelOpts({
        cwd,
        config,
        modifyBabelOpts,
        modifyBabelPresetOpts,
        targets
    });

    // --------------- js -----------
    // https://webpack.docschina.org/configuration/module/#resolve-fully-specified
    webpackConfig.module
        .rule('esm')
        .test(/\.m?jsx?$/)
        .resolve.set('fullySpecified', false);

    webpackConfig.module
        .rule('js')
        .test(/\.(js|mjs|jsx)$/)
        .exclude.add((filepath) => {
            // always transpile js in vue files
            if (/\.vue\.jsx?$/.test(filepath)) {
                return false;
            }
            // Don't transpile node_modules
            return /node_modules/.test(filepath);
        }).end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOpts);

    // 为了避免第三方依赖包编译不充分导致线上问题，默认对 node_modules 也进行全编译
    const transpileDepRegex = genTranspileDepRegex(config.nodeModulesTransform.exclude);
    webpackConfig.module
        .rule('js-in-node_modules')
        .test(/\.(js|mjs)$/)
        .include.add(/node_modules/).end()
        .exclude.add((filepath) => {
            if (transpileDepRegex && transpileDepRegex.test(filepath)) {
                return true;
            }

            return false;
        }).end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOpts);

    // --------------- css -----------
    createCssWebpackConfig({
        isDev,
        config,
        webpackConfig,
        browserslist
    });

    // --------------- vue -----------
    createVueWebpackConfig({
        config,
        webpackConfig
    });

    // --------------- html -----------
    const { publicCopyIgnore } = await createHtmlWebpackConfig({
        cwd,
        config,
        webpackConfig,
        headScripts,
        isProd
    });

    // --------------- copy -----------
    const copyPatterns = [existsSync(join(cwd, 'public')) && {
        from: join(cwd, 'public'),
        filter: (resourcePath) => {
            if (resourcePath.indexOf('.DS_Store') !== -1) {
                return false;
            }
            if (publicCopyIgnore.includes(resourcePath)) {
                return false;
            }
            return true;
        },
        to: absoluteOutput
    }, ...((config.copy || []).map((item) => {
        if (typeof item === 'string') {
            return {
                from: join(cwd, item.from),
                to: absoluteOutput
            };
        }
        return {
            from: join(cwd, item.from),
            to: join(absoluteOutput, item.to)
        };
    }))].filter(Boolean);
    // const publicCopyIgnore = ['.DS_Store'];
    if (copyPatterns.length) {
        webpackConfig
            .plugin('copy')
            .use(require.resolve('copy-webpack-plugin'), [{
                patterns: copyPatterns
            }]);
    }

    // --------------- define -----------
    createDefineWebpackConfig({
        config,
        webpackConfig
    });

    // --------------- 分包 -----------
    if (isProd) {
        webpackConfig.optimization.splitChunks({
            cacheGroups: {
                defaultVendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        });
    }

    // --------------- 压缩 -----------
    createMinimizerWebpackConfig({
        isProd,
        config,
        webpackConfig
    });

    // --------------- 构建输出 ----------
    webpackConfig
        .plugin('progress')
        .use(require.resolve('webpackbar'));

    webpackConfig
        .plugin('friendly-errors')
        .use(require('@soda/friendly-errors-webpack-plugin'));

    // --------------- chainwebpack -----------
    if (chainWebpack) {
        await chainWebpack(webpackConfig, {
            webpack
        });
    }
    // 用户配置的 chainWebpack 优先级最高
    if (config.chainWebpack) {
        await config.chainWebpack(webpackConfig, {
            env,
            webpack
        });
    }

    return webpackConfig.toConfig();
}
