export function buildSwcOptions(browserslist, config, isJsx, isTs) {
    const result = {
        env: {
            targets: browserslist,
            mode: 'entry',
            coreJs: '3',
        },
        jsc: {
            parser: {
                syntax: isTs ? 'typescript' : 'ecmascript',
                jsx: isJsx,
            },
        },
        minify: true,
        ...config.swcLoader,
    };
    if (isJsx) {
        result.jsc.parser.experimental.plugins = (result.jsc.parser.experimental.plugins || []).push(['swc-plugin-vue-jsx', {}]);
    }
    return result;
}
