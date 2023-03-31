import { dirname } from 'path';
import winPath from './winPath';

const resolvePkg = (pkgName) => winPath(dirname(require.resolve(`${pkgName}/package.json`)));

export default resolvePkg;
