function importsToStr(imports) {
    return imports.map((imp) => {
        const { source, build = [], runtime = [] } = imp;
        return `import {${build.concat(runtime).join(', ')}} from '${source}';`;
    });
}

function genTypeContent(imports) {
    return {
        RUNTIME_TYPES: imports.reduce((previousValue, currentValue) => previousValue.concat(currentValue.runtime || []), []).join(' & '),
        BUILD_TYPES: imports.reduce((previousValue, currentValue) => previousValue.concat(currentValue.build || []), []).join(' & '),
        imports: importsToStr(imports).join('\n'),
    };
}

export default function (api) {
    const {
        utils: { Mustache },
    } = api;

    api.onGenerateFiles(async () => {
        const typeTpl = `
{{{ imports }}}

export type PluginRuntimeConfig = {{{RUNTIME_TYPES}}};
export type PluginBuildConfig = {{{BUILD_TYPES}}};
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
