import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const OWNER_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');

export function getWorkPath() {
    return process.env.PWD || process.cwd();
}

export function removeSync(dir: string) {
    rmSync(dir, {
        recursive: true,
        force: true,
    });
}

export function readJsonSync(filePath: string) {
    const content = readFileSync(filePath, 'utf-8');

    return JSON.parse(content);
}

export function writeJSONSync(filePath: string, data: Record<string, any>) {
    writeFileSync(filePath, JSON.stringify(data, null, 2));
}
