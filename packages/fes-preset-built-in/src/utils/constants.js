import { dirname } from 'path';
import { winPath } from '@fesjs/utils';

export const runtimePath = winPath(dirname(require.resolve('@fesjs/runtime/package.json')));
