import { dirname } from 'path';
import winPath from './winPath';

const resolvePkg = (pkgName, builder) => {
    const pkgPath = dirname(require.resolve(`${pkgName}/package.json`));
    if (builder.isVite) {
        return winPath(pkgPath.replace('/', `${builder.innerDepPrefix}/`));
    }
    return winPath(pkgPath);
};

export default resolvePkg;
