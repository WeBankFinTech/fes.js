export default function (api) {
    api.registerCommand({
        command: 'info',
        description: 'print debugging information about your environment',
        async fn() {
            return require('envinfo')
                .run(
                    {
                        System: ['OS', 'CPU'],
                        Binaries: ['Node', 'Pnpm', 'npm'],
                        Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
                        npmPackages: ['@fesjs/fes', 'vue', 'vue-router'],
                        npmGlobalPackages: ['@fesjs/fes'],
                    },
                    {
                        showNotFound: true,
                        duplicates: true,
                        fullTree: true,
                    },
                )
                .then(console.log);
        },
    });
}
