import { winPath } from '@umijs/utils';
import { dirname } from 'path';

export const runtimePath = winPath(
    dirname(require.resolve('@webank/fes-runtime/package.json'))
);
