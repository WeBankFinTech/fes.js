import { copyFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';

export function getPublicPkgs() {
    const packagesDir = join(process.cwd(), 'packages');
    const dirs = readdirSync(packagesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const publicPkgs = [];
    for (const dir of dirs) {
        const pkgJsonPath = join(packagesDir, dir, 'package.json');
        try {
            const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
            // 如果没有 private 字段或者 private 为 false，则是需要发布的包
            if (!pkgJson.private) {
                publicPkgs.push(dir);
            }
        }
        catch (error) {
            // 如果读取或解析 package.json 失败，跳过该目录
            console.warn(`Warning: Could not read package.json for ${dir}`, error.message);
        }
    }

    return publicPkgs;
}

export function copyTplFiles(srcDir, dstDir) {
    function walk(currentSrc, currentDst) {
        readdirSync(currentSrc, { withFileTypes: true }).forEach((dirent) => {
            const srcPath = join(currentSrc, dirent.name);
            const dstPath = join(currentDst, dirent.name);

            if (dirent.isDirectory()) {
                walk(srcPath, dstPath);
            }
            else if (dirent.isFile() && dirent.name.endsWith('.tpl')) {
                mkdirSync(dirname(dstPath), { recursive: true });
                copyFileSync(srcPath, dstPath);
                console.log(`Copied: ${srcPath} -> ${dstPath}`);
            }
        });
    }
    walk(srcDir, dstDir);
}
