import type { WebpackBuildConfig } from '../../../shared';
import process from 'node:process';
import { winPath } from '@fesjs/utils';
import { esmRequire, esmResolve } from '../../../shared';

interface PresetOpts {
    transformRuntime: Record<string, any>;
}

interface GetBabelOptsOptions {
    cwd: string;
    targets: Record<string, string>;
    config: WebpackBuildConfig;
    presetOpts: PresetOpts;
}

function getBabelOpts({ cwd, targets, config, presetOpts }: GetBabelOptsOptions) {
    const presets: any[] = [
        [
            esmResolve('@babel/preset-env'),
            {
                targets,
                useBuiltIns: 'usage',
                corejs: {
                    version: esmRequire('core-js/package.json').version,
                    proposals: true,
                },
                modules: false,
            },
        ],
        [
            // FEATURE 实现类型安全检查
            esmRequire('@babel/preset-typescript').default,
            {
                // https://babeljs.io/docs/en/babel-plugin-transform-typescript#impartial-namespace-support
                allowNamespaces: true,
                isTSX: true,
                allExtensions: true,
            },
        ],
        ...(config.extraBabelPresets || []),
    ];
    const plugins: any[] = [
        esmRequire('@babel/plugin-proposal-export-default-from').default,
        [
            esmRequire('@babel/plugin-proposal-pipeline-operator').default,
            {
                proposal: 'minimal',
            },
        ],
        esmRequire('@babel/plugin-proposal-do-expressions').default,
        esmRequire('@babel/plugin-proposal-function-bind').default,
        [
            esmResolve('@babel/plugin-transform-runtime'),
            {
                useESModules: true,
                ...presetOpts.transformRuntime,
            },
        ],
        esmResolve('@vue/babel-plugin-jsx'),
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

interface ExportDefaultOptions {
    cwd: string;
    config: WebpackBuildConfig;
    modifyBabelOpts?: (opts: any) => Promise<any>;
    modifyBabelPresetOpts?: (opts: PresetOpts) => Promise<PresetOpts>;
    targets: Record<string, string>;
}

export default async ({ cwd, config, modifyBabelOpts, modifyBabelPresetOpts, targets }: ExportDefaultOptions) => {
    let presetOpts: PresetOpts = {
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
