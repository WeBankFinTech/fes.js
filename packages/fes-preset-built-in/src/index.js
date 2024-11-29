export default function () {
    return {
        plugins: [
            // register methods
            require.resolve('./plugins/registerMethods'),
            require.resolve('./plugins/registerType'),

            // generate files
            require.resolve('./plugins/core/plugin'),
            require.resolve('./plugins/core/exports/coreExports'),
            require.resolve('./plugins/core/exports/pluginExports'),
            require.resolve('./plugins/core/entry'),
            require.resolve('./plugins/core/route'),

            // bundle configs
            require.resolve('./plugins/features/alias'),
            require.resolve('./plugins/features/autoprefixer'),
            require.resolve('./plugins/features/define'),
            require.resolve('./plugins/features/console'),
            require.resolve('./plugins/features/dynamicImport'),
            require.resolve('./plugins/features/globalCSS'),
            require.resolve('./plugins/features/inlineLimit'),
            require.resolve('./plugins/features/mountElementId'),
            require.resolve('./plugins/features/mock'),
            require.resolve('./plugins/features/outputPath'),
            require.resolve('./plugins/features/plugins'),
            require.resolve('./plugins/features/presets'),
            require.resolve('./plugins/features/proxy'),
            require.resolve('./plugins/features/publicPath'),
            require.resolve('./plugins/features/singular'),
            require.resolve('./plugins/features/targets'),
            require.resolve('./plugins/features/terserOptions'),
            require.resolve('./plugins/features/title'),

            // commands
            require.resolve('./plugins/commands/help'),
            require.resolve('./plugins/commands/info'),
        ],
    };
}
