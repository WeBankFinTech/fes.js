import { chalk, yParser } from '@umijs/utils';
import { existsSync } from 'fs';
import { join } from 'path';


const args = yParser(process.argv.slice(2), {
    alias: {
        version: ['v'],
        help: ['h'],
        force: ['f'],
        merge: ['m'],
        proxy: ['x']
    },
    boolean: ['version', 'help', 'merge', 'force']
});

if (args._.length > 1) {
    console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'));
}

if (args.version && !args._[0]) {
    args._[0] = 'version';
    const local = existsSync(join(__dirname, '../.local'))
        ? chalk.cyan('@local')
        : '';
    const { name, version } = require('../package.json');
    console.log(`${name}@${version}${local}`);
} else if (args.help && !args._[0]) {
    console.log(`
Usage: create-fes-app <name>

Options:
    -v, --version            Output the current version
    -h, --help               Display help for command   
    -f, --force              Overwrite target directory if it exists
    -m, --merge              Merge target directory if it exists
    -x, --proxy <proxyUrl>   Use specified proxy when creating project
    `);
} else {
    require('.')
        .default({
            cwd: process.cwd(),
            args
        })
        .catch((err) => {
            console.error(`Create failed, ${err.message}`);
            console.error(err);
        });
}
