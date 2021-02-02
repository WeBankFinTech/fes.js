

export default function (api) {
    api.registerCommand({
        command: 'help',
        description: 'show command helps',
        async fn({ program }) {
            program.outputHelp();
        }
    });
}
