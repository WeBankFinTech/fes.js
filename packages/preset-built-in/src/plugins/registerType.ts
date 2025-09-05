import { name } from '../../package.json';

function importsToStr(imports) {
    return imports.map((imp) => {
        const { source } = imp;
        return `export * from '${source}';`;
    });
}

function genTypeContent(imports) {
    return {
        imports: importsToStr(imports).join('\n'),
    };
}

export default function (api) {
    const {
        utils: { Mustache },
    } = api;

    api.addConfigType(() => ({
        source: name,
        runtime: ['InnerRuntimeConfig'],
        build: ['InnerBuildConfig'],
    }));

    api.onGenerateFiles(async () => {
        const typeTpl = `
{{{ imports }}}
`;
        const importSources = await api.applyPlugins({
            key: 'addConfigType',
            type: api.ApplyPluginsType.add,
            initialValue: [],
        });
        api.writeTmpFile({
            path: 'configType.d.ts',
            content: Mustache.render(typeTpl, genTypeContent(importSources)),
        });
    });
}
