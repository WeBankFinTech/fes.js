import { copyFileSync, readFileSync, statSync, writeFileSync } from 'fs';
import { dirname, relative, join } from 'path';

import chalk from 'chalk';
import mkdirp from 'mkdirp';
import glob from 'glob';
import Mustache from 'mustache';

class Generator {
    cwd;

    args;

    constructor({ cwd, args }) {
        this.cwd = cwd;
        this.args = args;
    }

    async run() {
        await this.writing();
    }

    // eslint-disable-next-line
    async writing() { }

    copyTpl(opts) {
        const tpl = readFileSync(opts.templatePath, 'utf-8');
        const content = Mustache.render(tpl, opts.context);
        mkdirp.sync(dirname(opts.target));
        console.log(`${chalk.green('Write:')} ${relative(this.cwd, opts.target)}`);
        writeFileSync(opts.target, content, 'utf-8');
    }

    copyDirectory(opts) {
        const files = glob.sync('**/*', {
            cwd: opts.path,
            dot: true,
            ignore: ['**/node_modules/**'],
        });
        files.forEach((file) => {
            const absFile = join(opts.path, file);
            if (statSync(absFile).isDirectory()) return;
            if (file.endsWith('.tpl')) {
                this.copyTpl({
                    templatePath: absFile,
                    target: join(opts.target, file.replace(/\.tpl$/, '')),
                    context: opts.context,
                });
            } else {
                console.log(`${chalk.green('Copy: ')} ${file}`);
                const absTarget = join(opts.target, file);
                mkdirp.sync(dirname(absTarget));
                copyFileSync(absFile, absTarget);
            }
        });
    }
}

export default Generator;
