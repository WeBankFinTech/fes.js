import { dirname } from 'node:path';
import { winPath } from '@fesjs/utils';
import { esmResolve } from '../shared';

export const runtimePath = winPath(dirname(esmResolve('@fesjs/runtime/package.json')));
