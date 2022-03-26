import { winPath } from '@fesjs/utils';
import { dirname } from 'path';

export const runtimePath = winPath(
    dirname(require.resolve('@fesjs/runtime/package.json'))
);
