#!/usr/bin/env node

const resolveCwd = require('resolve-cwd');

const { name, bin } = require('../package.json');

const localCLI = resolveCwd.silent(`${name}/${bin.fes}`);
if (!process.env.USE_GLOBAL_FES && localCLI && localCLI !== __filename) {
    // eslint-disable-next-line
    require(localCLI);
} else {
    require('../lib/cli');
}
