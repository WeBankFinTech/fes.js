import { dirname } from 'node:path';

import { fileURLToPath } from 'node:url';

export const defaultMainRootId = 'root-master';
export const defaultHistoryType = 'hash';
export const qiankunStateForMicroModelNamespace = 'qiankunStateForMicro';
export const qiankunStateFromMainModelNamespace = 'qiankunStateFromMain';

export const OWNER_DIR = dirname(fileURLToPath(import.meta.url));
