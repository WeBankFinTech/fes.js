import type { Paths, UserConfig } from '../types';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { lodash, winPath } from '@fesjs/utils';

interface GetServicePathsOptions {
    cwd: string;
    config: UserConfig;
    env: string;
}

function isDirectoryAndExist(path: string): boolean {
    return existsSync(path) && statSync(path).isDirectory();
}

function normalizeWithWinPath(obj: Record<string, string>): Record<string, string> {
    return lodash.mapValues(obj, value => winPath(value));
}

export default function getServicePaths({ cwd, config, env }: GetServicePathsOptions): Paths {
    let absSrcPath = cwd;
    if (isDirectoryAndExist(join(cwd, 'src'))) {
        absSrcPath = join(cwd, 'src');
    }

    const absPagesPath = config.singular ? join(absSrcPath, 'page') : join(absSrcPath, 'pages');

    const tmpDir = ['.fes', env !== 'development' && env].filter(Boolean).join('-');
    const paths = {
        tmpDir,
        cwd,
        absNodeModulesPath: join(cwd, 'node_modules'),
        absOutputPath: join(cwd, (config.outputPath as string) || './dist'),
        absSrcPath,
        absPagesPath,
        absTmpPath: join(absSrcPath, tmpDir),
    };
    return normalizeWithWinPath(paths) as unknown as Paths;
}
