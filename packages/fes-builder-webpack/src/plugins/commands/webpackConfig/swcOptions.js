export function buildSwcOptions(browserslist, config, isJsx, isTs) {
    return {
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
            experimental: {
                plugins: [['swc-plugin-vue-jsx', {}]],
            },
        },
        minify: true,
        ...config.swcLoader,
    };
}
