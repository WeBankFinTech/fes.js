export default function () {
    return {
        plugins: [
            // register methods
            require.resolve('./plugins/registerMethods'),

            // generate files
            require.resolve('./plugins/generateFiles/core/plugin'),
            require.resolve('./plugins/generateFiles/core/exports/coreExports'),
            require.resolve('./plugins/generateFiles/core/exports/pluginExports'),
            require.resolve('./plugins/generateFiles/fes'),

            // bundle configs
            require.resolve('./plugins/features/alias'),
            require.resolve('./plugins/features/analyze'),
            require.resolve('./plugins/features/autoprefixer'),
            require.resolve('./plugins/features/base'),
            require.resolve('./plugins/features/chainWebpack'),
            require.resolve('./plugins/features/cssLoader'),
            require.resolve('./plugins/features/copy'),
            require.resolve('./plugins/features/define'),
            require.resolve('./plugins/features/devServer'),
            require.resolve('./plugins/features/devtool'),
            require.resolve('./plugins/features/dynamicImport'),
            require.resolve('./plugins/features/externals'),
            require.resolve('./plugins/features/exportStatic'),
            require.resolve('./plugins/features/extraBabelPlugins'),
            require.resolve('./plugins/features/extraBabelPresets'),
            require.resolve('./plugins/features/extraPostCSSPlugins'),
            require.resolve('./plugins/features/html'),
            require.resolve('./plugins/features/globalCSS'),
            require.resolve('./plugins/features/inlineLimit'),
            require.resolve('./plugins/features/lessLoader'),
            require.resolve('./plugins/features/mountElementId'),
            require.resolve('./plugins/features/mock'),
            require.resolve('./plugins/features/outputPath'),
            require.resolve('./plugins/features/plugins'),
            require.resolve('./plugins/features/postcssLoader'),
            require.resolve('./plugins/features/proxy'),
            require.resolve('./plugins/features/publicPath'),
            require.resolve('./plugins/features/runtimePublicPath'),
            require.resolve('./plugins/features/singular'),
            require.resolve('./plugins/features/targets'),
            require.resolve('./plugins/features/terserOptions'),
            require.resolve('./plugins/features/nodeModulesTransform'),
            require.resolve('./plugins/features/vueLoader'),
            require.resolve('./plugins/features/useExtraCSS'),

            // misc
            require.resolve('./plugins/misc/route'),

            // commands
            require.resolve('./plugins/commands/build'),
            require.resolve('./plugins/commands/dev'),
            require.resolve('./plugins/commands/help'),
            require.resolve('./plugins/commands/info'),
            require.resolve('./plugins/commands/webpack')
        ]
    };
}
