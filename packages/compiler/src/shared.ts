import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * 获取编译器所有者的目录路径
 */
export const OWNER_DIR: string = join(dirname(fileURLToPath(import.meta.url)), '..');
