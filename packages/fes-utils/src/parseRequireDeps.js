import { readFileSync } from 'fs';
import { dirname } from 'path';
import crequire from 'crequire';
import lodash from 'lodash';
import resolve from 'resolve';
import winPath from './winPath';

function parse(filePath) {
    const content = readFileSync(filePath, 'utf-8');
    return crequire(content)
        .map((o) => o.path)
        .filter((path) => path.charAt(0) === '.')
        .map((path) =>
            winPath(
                resolve.sync(path, {
                    basedir: dirname(filePath),
                    extensions: ['.tsx', '.ts', '.jsx', '.js'],
                }),
            ),
        );
}

export default function parseRequireDeps(filePath) {
    const paths = [filePath];
    const ret = [winPath(filePath)];

    while (paths.length) {
        // 避免依赖循环
        const extraPaths = lodash.pullAll(parse(paths.shift()), ret);
        if (extraPaths.length) {
            paths.push(...extraPaths);
            ret.push(...extraPaths);
        }
    }

    return ret;
}
