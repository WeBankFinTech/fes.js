import {
    winPath
} from '@umijs/utils';

function getBableOpts({
    cwd,
    targets,
    config,
    presetOpts
}) {
    const presets = [
        [
            require.resolve('@babel/preset-env'),
            {
                targets,
                useBuiltIns: 'usage',
                corejs: {
                    version: 3,
                    proposals: true
                },
                modules: false
            }
        ],
        ...(config.extraBabelPresets || [])
    ];
    const plugins = [
        require('@babel/plugin-proposal-export-default-from').default,
        [
            require('@babel/plugin-proposal-pipeline-operator').default,
            {
                proposal: 'minimal'
            }
        ],
        require('@babel/plugin-proposal-do-expressions').default,
        require('@babel/plugin-proposal-function-bind').default,
        [
            require.resolve('@babel/plugin-transform-runtime'),
            {
                useESModules: true,
                ...presetOpts.transformRuntime
            }
        ],
        ...(presetOpts.import
            ? presetOpts.import.map(importOpts => [
                require.resolve('babel-plugin-import'),
                importOpts,
                importOpts.libraryName
            ])
            : []),
        require.resolve('@vue/babel-plugin-jsx'),
        ...(config.extraBabelPresets || [])
    ];
    return {
        babelrc: false,
        cacheDirectory: process.env.BABEL_CACHE !== 'none' ? winPath(`${cwd}/.cache/babel-loader`) : false,
        presets,
        plugins,
        overrides: [{
            test: [/[\\/]node_modules[\\/]/, /\.fes/],
            sourceType: 'unambiguous'
        }]
    };
}


export default async ({
    cwd,
    config,
    modifyBabelOpts,
    modifyBabelPresetOpts,
    targets
}) => {
    let presetOpts = {
        transformRuntime: {}
    };
    if (modifyBabelPresetOpts) {
        presetOpts = await modifyBabelPresetOpts(presetOpts);
    }
    let babelOpts = getBableOpts({
        cwd,
        config,
        presetOpts,
        targets
    });
    if (modifyBabelOpts) {
        babelOpts = await modifyBabelOpts(babelOpts);
    }
    return babelOpts;
};
