/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/tree/master/packages/core
 */

import { join } from 'path';
import { existsSync, statSync } from 'fs';
import { lodash, winPath } from '@fesjs/utils';

function isDirectoryAndExist(path) {
    return existsSync(path) && statSync(path).isDirectory();
}

function normalizeWithWinPath(obj) {
    return lodash.mapValues(obj, (value) => winPath(value));
}

export default function getServicePaths({ cwd, config, env }) {
    let absSrcPath = cwd;
    if (isDirectoryAndExist(join(cwd, 'src'))) {
        absSrcPath = join(cwd, 'src');
    }

    const absPagesPath = config.singular ? join(absSrcPath, 'page') : join(absSrcPath, 'pages');

    const tmpDir = ['.fes', env !== 'development' && env].filter(Boolean).join('-');
    return normalizeWithWinPath({
        tmpDir,
        cwd,
        absNodeModulesPath: join(cwd, 'node_modules'),
        absOutputPath: join(cwd, config.outputPath || './dist'),
        absSrcPath,
        absPagesPath,
        absTmpPath: join(absSrcPath, tmpDir),
    });
}
