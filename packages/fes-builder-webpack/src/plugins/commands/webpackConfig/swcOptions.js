import { deepmerge } from '@fesjs/utils';

export function buildSwcOptions(targets, config, isJsx, isTs) {
    if (config.swcLoader?.cjsPkg) {
        delete config.swcLoader.cjsPkg;
    }
    return deepmerge(
        {
            // sync: true,
            env: {
                targets,
                mode: 'usage',
                coreJs: '3',
            },
            jsc: {
                parser: {
                    syntax: isTs ? 'typescript' : 'ecmascript',
                    jsx: isTs ? undefined : isJsx,
                    tsx: isTs ? isJsx : undefined,
                },
                experimental: isJsx
                    ? {
                          plugins: [['swc-plugin-vue-jsx', {}]],
                      }
                    : undefined,
                // preserveAllComments: true,
            },
            isModule: 'unknown',
            minify: false,
        },
        config.swcLoader || {},
    );
}
