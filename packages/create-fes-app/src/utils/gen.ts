import { readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { copySync, outputFileSync } from 'fs-extra/esm';
import { globSync } from 'glob';
import Mustache from 'mustache';

import { getWorkPath } from '../shared';

function copyTpl(opts: {
    templatePath: string;
    target: string;
    context: Record<string, any>;
}): void {
    const tpl = readFileSync(opts.templatePath, 'utf-8');
    const content = Mustache.render(tpl, opts.context);

    outputFileSync(opts.target, content, 'utf-8');
}

export function copyDirectory(opts: {
    path: string;
    target: string;
    context: Record<string, any>;
}): void {
    const files = globSync('**/*', {
        cwd: opts.path,
        dot: true,
        ignore: ['**/node_modules/**'],
    });
    files.forEach((file) => {
        const absFile = join(opts.path, file);
        if (statSync(absFile).isDirectory()) {
            return;
        }
        if (file.endsWith('.tpl')) {
            return copyTpl({
                templatePath: absFile,
                target: join(opts.target, file.replace(/\.tpl$/, '')),
                context: opts.context,
            });
        }

        const absTarget = join(opts.target, file);
        copySync(absFile, absTarget);
    });
}
