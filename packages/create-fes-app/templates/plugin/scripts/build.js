// 关闭 import 规则
/* eslint import/no-extraneous-dependencies: 0 */

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const merge = require('deepmerge');
const chokidar = require('chokidar');
const chalk = require('chalk');
const argv = require('yargs-parser')(process.argv.slice(2));

const compiler = require('./compiler');
const randomColor = require('./randomColor');
const pkg = require('../package.json');


const ESM_OUTPUT_DIR = 'es';
const NODE_CJS_OUTPUT_DIR = 'lib';
const SOURCE_DIR = 'src';
const CONFIG_FILE_NAME = 'build.config.js';
const GLOBAL_CONFIG_PATH = path.join(process.cwd(), CONFIG_FILE_NAME);
const DEFAULT_CONFIG = {
    target: 'node'
};

function genLog(pkgName) {
    return (msg) => {
        console.log(`${randomColor(pkgName)}: ${msg}`);
    };
}

function genShortPath(filePath) {
    const codePath = filePath.split(`/${SOURCE_DIR}/`)[1];
    return `${SOURCE_DIR}/${codePath}`;
}

function getPkgSourcePath() {
    return path.join(process.cwd(), SOURCE_DIR);
}

function getOutputPath(config) {
    if (config.target === 'browser') {
        return path.join(process.cwd(), ESM_OUTPUT_DIR);
    }

    return path.join(process.cwd(), NODE_CJS_OUTPUT_DIR);
}

function getGlobalConfig() {
    if (fs.existsSync(GLOBAL_CONFIG_PATH)) {
        const userConfig = require(GLOBAL_CONFIG_PATH);
        return merge(DEFAULT_CONFIG, userConfig);
    }
    return DEFAULT_CONFIG;
}

function cleanBeforeCompilerResult(log) {
    const esmOutputDir = path.join(process.cwd(), ESM_OUTPUT_DIR);
    const cjsOutputDir = path.join(process.cwd(), NODE_CJS_OUTPUT_DIR);
    if (fs.existsSync(esmOutputDir)) {
        log(chalk.gray(`Clean ${ESM_OUTPUT_DIR} directory`));
        fse.removeSync(esmOutputDir);
    }
    if (fs.existsSync(cjsOutputDir)) {
        log(chalk.gray(`Clean ${NODE_CJS_OUTPUT_DIR} directory`));
        fse.removeSync(cjsOutputDir);
    }
}

function transformFile(filePath, outputPath, config, log) {
    if (/\.[jt]sx?$/.test(path.extname(filePath))) {
        try {
            const code = fs.readFileSync(filePath, 'utf-8');
            const shortFilePath = genShortPath(filePath);
            const transformedCode = compiler(code, config);

            const type = config.target === 'browser' ? ESM_OUTPUT_DIR : NODE_CJS_OUTPUT_DIR;
            log(`Transform to ${type} for ${config.target === 'browser' ? chalk.yellow(shortFilePath) : chalk.blue(shortFilePath)}`);
            fse.outputFileSync(outputPath, transformedCode);
        } catch (error) {
            console.error(error);
        }
    } else {
        fse.copySync(filePath, outputPath);
    }
}

function compilerPkg(codeDir, outputDir, config, log) {
    const files = fs.readdirSync(codeDir);
    files.forEach((file) => {
        const filePath = path.join(codeDir, file);
        const outputFilePath = path.join(outputDir, file);
        const fileStats = fs.lstatSync(filePath);
        if (config.copy.includes(file)) {
            fse.copySync(filePath, outputFilePath);
        } else if (fileStats.isDirectory(filePath) && !/__tests__/.test(file)) {
            fse.ensureDirSync(outputFilePath);
            compilerPkg(filePath, outputFilePath, config, log);
        } else if (fileStats.isFile(filePath)) {
            transformFile(filePath, outputFilePath, config, log);
        }
    });
}

function watchFile(dir, outputDir, config, log) {
    chokidar
        .watch(dir, {
            ignoreInitial: true
        })
        .on('all', (event, changeFile) => {
            // 修改的可能是一个目录，一个文件，一个需要 copy 的文件 or 目录
            const shortChangeFile = genShortPath(changeFile);
            const outputPath = changeFile.replace(dir, outputDir);
            const stat = fs.lstatSync(changeFile);
            log(`[${event}] ${shortChangeFile}`);
            if (config.resolveCopy.some(item => changeFile.startsWith(item))) {
                fse.copySync(changeFile, outputPath);
            } else if (stat.isFile()) {
                transformFile(changeFile, outputPath, config, log);
            } else if (stat.isDirectory()) {
                compilerPkg(changeFile, outputPath, config);
            }
        });
}

function main() {
    const sourceCodeDir = getPkgSourcePath();
    const pkgName = pkg.name;
    if (fs.existsSync(sourceCodeDir)) {
        const log = genLog(pkgName);
        const config = getGlobalConfig();
        const outputDir = getOutputPath(config);

        cleanBeforeCompilerResult(log);
        const type = config.target === 'browser' ? ESM_OUTPUT_DIR : NODE_CJS_OUTPUT_DIR;
        log(chalk.white(`Build ${type} with babel`));
        compilerPkg(sourceCodeDir, outputDir, config, log);
        if (argv.watch) {
            log(chalk.magenta(`Start watch ${SOURCE_DIR} directory...`));
            watchFile(sourceCodeDir, outputDir, config, log);
        }
    }
}

main();
