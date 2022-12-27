import { deepmerge } from '@fesjs/utils';

export function buildSwcOptions(targets, config, isJsx, isTs) {
    return deepmerge(
        {
            env: {
                targets,
                mode: 'usage',
                coreJs: '3',
            },
            jsc: {
                parser: {
                    syntax: isTs ? 'typescript' : 'ecmascript',
                    jsx: isJsx,
                },
                experimental: {
                    plugins: [['swc-plugin-vue-jsx', {}]],
                },
            },
            minify: true,
        },
        config.swcLoader || {},
    );
}
