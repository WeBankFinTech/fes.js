import chalk from 'chalk';
import yParser from 'yargs-parser';
import lodash from 'lodash';
import * as chokidar from 'chokidar';
import semver from 'semver';
import deepmerge from 'deepmerge';
import glob from 'glob';
import createDebug from 'debug';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import pkgUp from 'pkg-up';
import portfinder from 'portfinder';
import resolve from 'resolve';
import Mustache from 'mustache';

import Generator from './Generator';
import winPath from './winPath';
import delay from './delay';
import compatESModuleRequire from './compatESModuleRequire';
import cleanRequireCache from './cleanRequireCache';
import parseRequireDeps from './parseRequireDeps';
import mergeConfig from './mergeConfig';

export {
    chalk,
    yParser,
    lodash,
    chokidar,
    semver,
    deepmerge,
    glob,
    createDebug,
    mkdirp,
    Mustache,
    parser,
    rimraf,
    traverse,
    pkgUp,
    portfinder,
    resolve
};

export {
    Generator,
    winPath,
    delay,
    compatESModuleRequire,
    cleanRequireCache,
    parseRequireDeps,
    mergeConfig
};
