import { join } from 'node:path';
import { existsSync } from 'node:fs';
import Config from 'webpack-5-chain';
import webpack from 'webpack';
import createCssWebpackConfig from './css';
import getBabelOpts from './getBabelOpts';
import createVueWebpackConfig from './vue';
import createDefineWebpackConfig from './define';
import createMinimizerWebpackConfig from './minimizer';
import createHtmlWebpackConfig from './html';

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
            return require('node:os').platform().startsWith('win') ? depPath.replace(/\\/g, '\\\\') : depPath;
        }
        if (dep instanceof RegExp) { return dep.source; }

        throw new Error('exclude only accepts an array of string or regular expressions');
    });
    return deps.length ? new RegExp(deps.join('|')) : null;
}

function handleAlias({ api, webpackConfig }) {
    const config = api.config;
    if (config.alias) {
        Object.keys(config.alias).forEach((key) => {
            webpackConfig.resolve.alias.set(key, config.alias[key]);
        });
    }
    webpackConfig.resolve.alias.set('@', api.paths.absSrcPath);
    webpackConfig.resolve.alias.set('@@', api.paths.absTmpPath);
}

export default async function getConfig({ api, cwd, config, env, entry = {}, modifyBabelOpts, modifyBabelPresetOpts, chainWebpack, headScripts, publicPath }) {
    const isDev = env === 'development';
    const isProd = env === 'production';
    const webpackConfig = new Config();
    const absoluteOutput = join(cwd, config.outputPath || 'dist');

    webpackConfig.mode(env);
    webpackConfig.stats('errors-only');
    webpackConfig.externals(config.externals || {});
    webpackConfig.devtool(isDev ? config.devtool || 'cheap-module-source-map' : config.devtool);

    // --------------- cache -----------
    webpackConfig.cache({
        type: 'filesystem',
        version: require('../../../../package.json').version,
        cacheDirectory: join(cwd, '.cache/webpack'),
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
        .filename('static/[name].[contenthash:8].js')
        .chunkFilename('static/[name].[contenthash:8].chunk.js')
        .assetModuleFilename('static/[name][hash:8][ext]');

    // --------------- resolve -----------
    webpackConfig.resolve.extensions.merge(['.mjs', '.js', '.jsx', '.vue', '.ts', '.tsx', '.json', '.wasm']);

    handleAlias({ api, webpackConfig });

    // --------------- module -----------
    webpackConfig.module
        .rule('image')
        .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
        .type('asset')
        .parser({
            dataUrlCondition: {
                maxSize: config.inlineLimit || 8 * 1024,
            },
        });

    webpackConfig.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .type('asset/resource');

    webpackConfig.module
        .rule('fonts')
        .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
        .type('asset/resource');

    webpackConfig.module
        .rule('text-file')
        .test(/\.(txt|text|md)$/)
        .type('asset/source');

    const { targets, browserslist } = api.utils.getTargetsAndBrowsersList({ config });
    const babelOpts = await getBabelOpts({
        cwd,
        config,
        modifyBabelOpts,
        modifyBabelPresetOpts,
        targets,
    });

    // --------------- js -----------
    // https://webpack.docschina.org/configuration/module/#resolve-fully-specified
    webpackConfig.module
        .rule('esm')
        .test(/\.m?jsx?$/)
        .resolve.set('fullySpecified', false);

    webpackConfig.module
        .rule('js')
        .test(/\.(js|mjs|jsx|ts|tsx)$/)
        .exclude.add((filepath) => {
            // always transpile js in vue files
            if (/(\.vue|\.jsx)$/.test(filepath)) { return false; }

            // Don't transpile node_modules
            return /node_modules/.test(filepath);
        })
        .end()
        .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .options(babelOpts);

    // 为了避免第三方依赖包编译不充分导致线上问题，默认对 node_modules 也进行全编译，只在生产构建的时候进行
    if (isProd) {
        const transpileDepRegex = genTranspileDepRegex(config.nodeModulesTransform.exclude);
        webpackConfig.module
            .rule('js-in-node_modules')
            .test(/\.(js|mjs)$/)
            .include.add(/node_modules/)
            .end()
            .exclude.add((filepath) => {
                if (transpileDepRegex && transpileDepRegex.test(filepath)) { return true; }

                return false;
            })
            .end()
            .use('babel-loader')
            .loader(require.resolve('babel-loader'))
            .options(babelOpts);
    }

    // --------------- css -----------
    const createCSSRule = createCssWebpackConfig({
        isDev,
        config,
        webpackConfig,
        browserslist,
    });

    // --------------- vue -----------
    createVueWebpackConfig({
        config,
        webpackConfig,
    });

    // --------------- html -----------
    const { publicCopyIgnore } = await createHtmlWebpackConfig({
        api,
        cwd,
        config,
        webpackConfig,
        headScripts,
        isProd,
        publicPath,
    });

    // --------------- copy -----------
    const copyPatterns = [
        existsSync(join(cwd, 'public')) && {
            from: join(cwd, 'public'),
            filter: (resourcePath) => {
                if (resourcePath.includes('.DS_Store')) { return false; }

                if (publicCopyIgnore.includes(resourcePath)) { return false; }

                return true;
            },
            to: absoluteOutput,
        },
        ...(config.copy || []).map((item) => {
            if (typeof item === 'string') {
                return {
                    from: join(cwd, item.from),
                    to: absoluteOutput,
                };
            }
            return {
                from: join(cwd, item.from),
                to: join(absoluteOutput, item.to),
            };
        }),
    ].filter(Boolean);
    // const publicCopyIgnore = ['.DS_Store'];
    if (copyPatterns.length) {
        webpackConfig.plugin('copy').use(require.resolve('copy-webpack-plugin'), [
            {
                patterns: copyPatterns,
            },
        ]);
    }

    webpackConfig.plugin('progress').use(require.resolve(require.resolve('webpackbar')));

    // --------------- define -----------
    createDefineWebpackConfig({
        config,
        publicPath,
        webpackConfig,
    });

    // --------------- 分包 -----------
    if (isProd) {
        webpackConfig.optimization.splitChunks({
            cacheGroups: {
                defaultVendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial',
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true,
                },
            },
        });
    }

    // --------------- 压缩 -----------
    createMinimizerWebpackConfig({
        isProd,
        config,
        webpackConfig,
    });

    // --------------- chainwebpack -----------
    if (chainWebpack) {
        await chainWebpack(webpackConfig, {
            createCSSRule,
            env,
            targets,
            browserslist,
            webpack,
        });
    }
    // 用户配置的 chainWebpack 优先级最高
    if (config.chainWebpack) {
        await config.chainWebpack(webpackConfig, {
            createCSSRule,
            env,
            targets,
            browserslist,
            webpack,
        });
    }

    const memo = webpackConfig.toConfig();
    memo.infrastructureLogging = {
        level: 'error',
        ...memo.infrastructureLogging,
    };
    memo.watchOptions = {
        aggregateTimeout: 200,
        ...memo.watchOptions,
    };

    return memo;
}
