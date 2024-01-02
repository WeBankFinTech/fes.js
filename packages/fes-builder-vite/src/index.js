import process from 'node:process';

export default function () {
    process.env.VITE_CJS_IGNORE_WARNING = 'true';

    return {
        plugins: [
            require.resolve('./registerBuilder'),
            require.resolve('./registerMethods'),
            require.resolve('./registerType'),

            // bundle configs
            require.resolve('./features/viteHtml'),
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
