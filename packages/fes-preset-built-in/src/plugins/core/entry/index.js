import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { winPath } from '@fesjs/utils';
import { runtimePath } from '../../../utils/constants';

export function importsToStr(imports) {
    return imports.map((imp) => {
        const { source, specifier } = imp;
        if (specifier) {
            return `import ${specifier} from '${winPath(source)}';`;
        }
        return `import '${winPath(source)}';`;
    });
}

export default function (api) {
    const {
        utils: { Mustache },
    } = api;

    api.onGenerateFiles(async () => {
        const fesTpl = readFileSync(join(__dirname, 'fes.tpl'), 'utf-8');
        api.writeTmpFile({
            path: 'fes.js',
            content: Mustache.render(fesTpl, {
                enableTitle: api.config.title !== false,
                defaultTitle: api.config.title || 'fes.js',
                runtimePath,
                rootElement: `#${api.config.mountElementId || 'app'}`,
                entryCode: (
                    await api.applyPlugins({
                        key: 'addEntryCode',
                        type: api.ApplyPluginsType.add,
                        initialValue: [],
                    })
                ).join('\r\n'),
                entryCodeAhead: (
                    await api.applyPlugins({
                        key: 'addEntryCodeAhead',
                        type: api.ApplyPluginsType.add,
                        initialValue: [],
                    })
                ).join('\r\n'),
                importsAhead: importsToStr(
                    await api.applyPlugins({
                        key: 'addEntryImportsAhead',
                        type: api.ApplyPluginsType.add,
                        initialValue: [],
                    }),
                ).join('\r\n'),
                imports: importsToStr(
                    await api.applyPlugins({
                        key: 'addEntryImports',
                        type: api.ApplyPluginsType.add,
                        initialValue: [],
                    }),
                ).join('\r\n'),
            }),
        });

        const defaultContainerName = 'defaultContainer';
        api.writeTmpFile({
            path: `${defaultContainerName}.vue`,
            content: readFileSync(join(__dirname, `./${defaultContainerName}.tpl`), 'utf-8'),
        });

        api.writeTmpFile({
            path: `initialState.js`,
            content: Mustache.render(readFileSync(join(__dirname, `./initialState.tpl`), 'utf-8')),
        });
    });
}
