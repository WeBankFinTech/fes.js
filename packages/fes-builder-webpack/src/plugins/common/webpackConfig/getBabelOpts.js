import { winPath } from '@fesjs/utils';

function getBabelOpts({ cwd, targets, config, presetOpts }) {
    const presets = [
        [
            require.resolve('@babel/preset-env'),
            {
                targets,
                useBuiltIns: 'usage',
                corejs: {
                    version: require('core-js/package.json').version,
                    proposals: true,
                },
                modules: false,
            },
        ],
        [
            // FEATURE 实现类型安全检查
            require('@babel/preset-typescript').default,
            {
                // https://babeljs.io/docs/en/babel-plugin-transform-typescript#impartial-namespace-support
                allowNamespaces: true,
                isTSX: true,
                allExtensions: true,
            },
        ],
        ...(config.extraBabelPresets || []),
    ];
    const plugins = [
        require('@babel/plugin-proposal-export-default-from').default,
        [
            require('@babel/plugin-proposal-pipeline-operator').default,
            {
                proposal: 'minimal',
            },
        ],
        require('@babel/plugin-proposal-do-expressions').default,
        require('@babel/plugin-proposal-function-bind').default,
        [
            require.resolve('@babel/plugin-transform-runtime'),
            {
                useESModules: true,
                ...presetOpts.transformRuntime,
            },
        ],
        require.resolve('@vue/babel-plugin-jsx'),
        ...(config.extraBabelPlugins || []),
    ];
    return {
        babelrc: false,
        configFile: false,
        cacheDirectory: process.env.BABEL_CACHE !== 'none' ? winPath(`${cwd}/.cache/babel-loader`) : false,
        presets,
        plugins,
        overrides: [
            {
                test: [/[\\/]node_modules[\\/]/, /\.fes/],
                sourceType: 'unambiguous',
            },
        ],
    };
}

export default async ({ cwd, config, modifyBabelOpts, modifyBabelPresetOpts, targets }) => {
    let presetOpts = {
        transformRuntime: {},
    };
    if (modifyBabelPresetOpts) {
        presetOpts = await modifyBabelPresetOpts(presetOpts);
    }
    let babelOpts = getBabelOpts({
        cwd,
        config,
        presetOpts,
        targets,
    });
    if (modifyBabelOpts) {
        babelOpts = await modifyBabelOpts(babelOpts);
    }
    return babelOpts;
};
