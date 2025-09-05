import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { parse } from 'dotenv';

/**
 * dotenv wrapper
 * @param envPath 环境变量文件路径
 */
export default function loadDotEnv(envPath: string): void {
    if (existsSync(envPath)) {
        const parsed = parse(readFileSync(envPath, 'utf-8')) || {};
        Object.keys(parsed).forEach((key) => {
            process.env[key] = parsed[key];
        });
    }
}
