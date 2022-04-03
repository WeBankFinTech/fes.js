export default function () {
    return {
        plugins: [
            // bundle configs
            require.resolve('./features/viteOption'),
            require.resolve('./features/viteVueJsx'),
            require.resolve('./features/viteVuePlugin'),

            // commands
            require.resolve('./commands/build'),
            require.resolve('./commands/dev'),
        ],
    };
}
