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
            require.resolve('./plugins/generateFiles/genType'),

            // bundle configs
            require.resolve('./plugins/features/alias'),
            require.resolve('./plugins/features/autoprefixer'),
            require.resolve('./plugins/features/checkVuePackage'),
            require.resolve('./plugins/features/define'),
            require.resolve('./plugins/features/dynamicImport'),
            require.resolve('./plugins/features/globalCSS'),
            require.resolve('./plugins/features/inlineLimit'),
            require.resolve('./plugins/features/mountElementId'),
            require.resolve('./plugins/features/mock'),
            require.resolve('./plugins/features/outputPath'),
            require.resolve('./plugins/features/plugins'),
            require.resolve('./plugins/features/proxy'),
            require.resolve('./plugins/features/publicPath'),
            require.resolve('./plugins/features/singular'),
            require.resolve('./plugins/features/targets'),
            require.resolve('./plugins/features/terserOptions'),
            require.resolve('./plugins/features/title'),

            // route
            require.resolve('./plugins/route'),

            // commands
            require.resolve('./plugins/commands/help'),
            require.resolve('./plugins/commands/info'),
        ],
    };
}
