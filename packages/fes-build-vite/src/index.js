export default function () {
    return {
        plugins: [
            // bundle configs

            // commands
            require.resolve('./commands/build'),
            require.resolve('./commands/dev'),
        ],
    };
}
