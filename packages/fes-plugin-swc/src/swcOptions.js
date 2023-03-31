import { deepmerge } from '@fesjs/utils';

const Supported = ['chrome', 'opera', 'edge', 'firefox', 'safari', 'ie', 'ios', 'android', 'node', 'electron'];

export function buildSwcOptions(targets, config, isJsx, isTs, minify = false) {
    if (config.swc?.loader?.cjsPkg) {
        delete config.swc.loader.cjsPkg;
    }
    return deepmerge(
        {
            // sync: true,
            env: {
                targets: Object.keys(targets)
                    .filter((key) => Supported.includes(key))
                    .reduce((memo, key) => {
                        memo[key] = targets[key];
                        return memo;
                    }, {}),
                mode: 'usage',
                // eslint-disable-next-line import/no-extraneous-dependencies
                coreJs: require('core-js/package.json').version,
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
            minify: minify ? {} : false,
        },
        config.swc?.loader || {},
    );
}
