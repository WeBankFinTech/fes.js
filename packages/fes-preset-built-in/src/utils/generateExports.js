import { lodash, winPath } from '@fesjs/utils';
import assert from 'assert';
import path from 'path';

const reserveLibrarys = ['fes']; // reserve library
// todo 插件导出内容冲突问题待解决
const reserveExportsNames = [
    'Link',
    'NavLink',
    'Redirect',
    'dynamic',
    'withRouter',
    'Route'
];

export default function generateExports(basePath, { item, fesExportsHook }) {
    assert(item.source, 'source should be supplied.');
    const source = path.relative(path.basename(basePath), item.source);
    assert(
        item.exportAll || item.specifiers,
        'exportAll or specifiers should be supplied.'
    );
    assert(
        !reserveLibrarys.includes(source),
        `${source} is reserve library, Please don't use it.`
    );
    if (item.exportAll) {
        return `export * from '${winPath(source)}';`;
    }
    assert(
        Array.isArray(item.specifiers),
        `specifiers should be Array, but got ${item.specifiers.toString()}.`
    );
    const specifiersStrArr = item.specifiers.map((specifier) => {
        if (typeof specifier === 'string') {
            assert(
                !reserveExportsNames.includes(specifier),
                `${specifier} is reserve name, you can use 'exported' to set alias.`
            );
            assert(
                !fesExportsHook[specifier],
                `${specifier} is Defined, you can use 'exported' to set alias.`
            );
            fesExportsHook[specifier] = true;
            return specifier;
        }
        assert(
            lodash.isPlainObject(specifier),
            `Configure item context should be Plain Object, but got ${specifier}.`
        );
        assert(
            specifier.local && specifier.exported,
            'local and exported should be supplied.'
        );
        return `${specifier.local} as ${specifier.exported}`;
    });
    return `export { ${specifiersStrArr.join(', ')} } from '${winPath(
        source
    )}';`;
}
