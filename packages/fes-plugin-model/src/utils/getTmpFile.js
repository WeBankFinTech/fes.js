import { EOL } from 'os';
import { winPath } from '@fesjs/utils';
import {
    genImports, genModels, genExtraModels
} from './index';

function getModels(files, absSrcPath) {
    const sortedModels = genModels(files, absSrcPath);
    return sortedModels
        .map(ele => `'${ele.namespace.replace(/'/g, "\\'")}': ${ele.importName}`)
        .join(', ');
}

function getExtraModels(models = [], absSrcPath) {
    const extraModels = genExtraModels(models, absSrcPath);
    return extraModels
        .map(ele => `'${ele.namespace}': ${ele.exportName || ele.importName}`)
        .join(', ');
}

function getExtraImports(models = [], absSrcPath) {
    const extraModels = genExtraModels(models, absSrcPath);
    return extraModels
        .map((ele) => {
            if (ele.exportName) {
                return `import { ${ele.exportName} } from '${winPath(
                    ele.importPath.replace(/'/g, "\\'")
                )}';`;
            }
            return `import ${ele.importName} from '${winPath(
                ele.importPath.replace(/'/g, "\\'")
            )}';`;
        })
        .join(EOL);
}

export const getTmpFile = (
    files,
    extra = [],
    absSrcPath
) => {
    const userImports = genImports(files);
    const userModels = getModels(files, absSrcPath);
    const extraImports = getExtraImports(extra, absSrcPath);
    const extraModels = getExtraModels(extra, absSrcPath);

    return {
        userImports,
        userModels,
        extraImports,
        extraModels
    };
};
