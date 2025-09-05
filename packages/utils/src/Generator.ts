import { copyFileSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

import chalk from 'chalk';
import glob from 'glob';
import mkdirp from 'mkdirp';
import Mustache from 'mustache';

interface GeneratorOptions {
    cwd: string;
    args: Record<string, any>;
}

interface CopyTplOptions {
    templatePath: string;
    target: string;
    context: Record<string, any>;
}

interface CopyDirectoryOptions {
    path: string;
    target: string;
    context: Record<string, any>;
}

class Generator {
    cwd: string;
    args: Record<string, any>;

    constructor({ cwd, args }: GeneratorOptions) {
        this.cwd = cwd;
        this.args = args;
    }

    async run(): Promise<void> {
        await this.writing();
    }

    async writing(): Promise<void> { }

    copyTpl(opts: CopyTplOptions): void {
        const tpl = readFileSync(opts.templatePath, 'utf-8');
        const content = Mustache.render(tpl, opts.context);
        mkdirp.sync(dirname(opts.target));
        // eslint-disable-next-line no-console
        console.log(`${chalk.green('Write:')} ${relative(this.cwd, opts.target)}`);
        writeFileSync(opts.target, content, 'utf-8');
    }

    copyDirectory(opts: CopyDirectoryOptions): void {
        const files = glob.sync('**/*', {
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
                return this.copyTpl({
                    templatePath: absFile,
                    target: join(opts.target, file.replace(/\.tpl$/, '')),
                    context: opts.context,
                });
            }
            // eslint-disable-next-line no-console
            console.log(`${chalk.green('Copy: ')} ${file}`);
            const absTarget = join(opts.target, file);
            mkdirp.sync(dirname(absTarget));
            copyFileSync(absFile, absTarget);
        });
    }
}

export default Generator;
