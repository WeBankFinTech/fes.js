function importsToStr(imports) {
    return imports.map((imp) => {
        const { source, specifier } = imp;
        if (specifier) {
            return `import {${specifier.join(', ')}} from '${source}';`;
        }
        return '';
    });
}

function genTypeContent(name, imports) {
    return {
        TYP_NAME: name,
        TYPES: imports.reduce((previousValue, currentValue) => previousValue.concat(currentValue.specifier || []), []).join(' & '),
        imports: importsToStr(imports).join('\n'),
    };
}

export default function (api) {
    const {
        utils: { Mustache },
    } = api;

    api.onGenerateFiles(async () => {
        const runtimeTypeName = 'PluginRuntimeConfig';
        const buildTypeName = 'PluginBuildConfig';
        const typeTpl = `
{{{ imports }}}

export type {{{TYP_NAME}}} = {{{TYPES}}}
`;
        const runtimeImportSources = await api.applyPlugins({
            key: 'addRuntimeType',
            type: api.ApplyPluginsType.add,
            initialValue: [],
        });
        api.writeTmpFile({
            path: 'runtime.d.ts',
            content: Mustache.render(typeTpl, genTypeContent(runtimeTypeName, runtimeImportSources)),
        });

        const buildImportSources = await api.applyPlugins({
            key: 'addBuildType',
            type: api.ApplyPluginsType.add,
            initialValue: [],
        });
        api.writeTmpFile({
            path: 'build.d.ts',
            content: Mustache.render(typeTpl, genTypeContent(buildTypeName, buildImportSources)),
        });
    });
}
