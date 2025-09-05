import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

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
