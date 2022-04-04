export default function () {
    return {
        plugins: [
            require.resolve('./registerMethods'),
            require.resolve('./registerType'),

            // bundle configs
            require.resolve('./features/viteOption'),
            require.resolve('./features/viteVueJsx'),
            require.resolve('./features/viteVuePlugin'),
            require.resolve('./features/viteAnalyze'),
            require.resolve('./features/viteLegacy'),

            // commands
            require.resolve('./commands/build'),
            require.resolve('./commands/dev'),
        ],
    };
}
