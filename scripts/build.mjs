import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import fse from 'fs-extra';
import chalk from 'chalk';
import merge from 'deepmerge';
import chokidar from 'chokidar';
import yargsParser from 'yargs-parser';
import buildConfig from '../build.config.js';
import compiler from './compiler.mjs';
import randomColor from './randomColor.mjs';

const argv = yargsParser(process.argv.slice(2));

const ESM_OUTPUT_DIR = 'es';
const NODE_CJS_OUTPUT_DIR = 'lib';
const SOURCE_DIR = 'src';
const CONFIG_FILE_NAME = 'build.config.js';
const GLOBAL_CONFIG_PATH = path.join(process.cwd(), CONFIG_FILE_NAME);
const DEFAULT_CONFIG = {
    target: 'node',
    pkgs: [],
    copy: [],
};

const PACKAGE_PATH = path.join(process.cwd(), './packages');

function genLog(pkgName) {
    return (msg) => {
        console.log(`${randomColor(pkgName)}: ${msg}`);
    };
}

function getPkgPath(pkgName) {
    return path.join(PACKAGE_PATH, pkgName);
}

function genShortPath(filePath) {
    // 处理 windows 的路径
    filePath = filePath.replace(/\\/g, '/');
    const codePath = filePath.split(`/${SOURCE_DIR}/`)[1];
    return `${SOURCE_DIR}/${codePath}`;
}

function getPkgSourcePath(pkgName) {
    return path.join(getPkgPath(pkgName), SOURCE_DIR);
}

function getOutputPath(config, pkgName) {
    if (config.target === 'browser')
        return path.join(getPkgPath(pkgName), ESM_OUTPUT_DIR);

    return path.join(getPkgPath(pkgName), NODE_CJS_OUTPUT_DIR);
}

function getGlobalConfig() {
    if (fs.existsSync(GLOBAL_CONFIG_PATH))
        return merge(DEFAULT_CONFIG, buildConfig);

    return DEFAULT_CONFIG;
}

async function getPkgConfig(config, pkgName) {
    const pkgConfigPath = path.join(getPkgPath(pkgName), CONFIG_FILE_NAME);
    if (argv.watch)
        config.sourceMap = true;

    if (fs.existsSync(pkgConfigPath)) {
        const content = await import(process.platform === 'win32' ? `file://${pkgConfigPath}` : pkgConfigPath);
        const result = merge(config, content.default);
        result.resolveCopy = result.copy.map(item => path.join(getPkgPath(pkgName), 'src', item));
        return result;
    }

    return config;
}

function getNeedCompilerPkg(config) {
    // 用户通过 cli 指定的包，优先级最高
    if (argv.pkg)
        return Array.isArray(argv.pkg) ? argv.pkg : argv.pkg;

    // 默认编译所有 packages
    if (!config.pkgs?.length) {
        const pkgs = fs.readdirSync(PACKAGE_PATH);
        return pkgs;
    }

    return config.pkgs;
}

function cleanBeforeCompilerResult(pkgName, log) {
    const esmOutputDir = path.join(getPkgPath(pkgName), ESM_OUTPUT_DIR);
    const cjsOutputDir = path.join(getPkgPath(pkgName), NODE_CJS_OUTPUT_DIR);
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
            if (config.sourceMap)
                config.sourceFileName = filePath;

            const transformedCode = compiler(code, config);

            const type = config.target === 'browser' ? ESM_OUTPUT_DIR : NODE_CJS_OUTPUT_DIR;
            log(`Transform to ${type} for ${config.target === 'browser' ? chalk.yellow(shortFilePath) : chalk.blue(shortFilePath)}`);
            fse.outputFileSync(outputPath, transformedCode);
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
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
        }
        else if (fileStats.isDirectory(filePath) && !/__tests__/.test(file)) {
            fse.ensureDirSync(outputFilePath);
            compilerPkg(filePath, outputFilePath, config, log);
        }
        else if (fileStats.isFile(filePath)) {
            transformFile(filePath, outputFilePath, config, log);
        }
    });
}

function watchFile(dir, outputDir, config, log) {
    chokidar
        .watch(dir, {
            ignoreInitial: true,
        })
        .on('all', (event, changeFile) => {
            // 修改的可能是一个目录，一个文件，一个需要 copy 的文件 or 目录
            const shortChangeFile = genShortPath(changeFile);
            const outputPath = changeFile.replace(dir, outputDir);
            const stat = fs.lstatSync(changeFile);
            log(`[${event}] ${shortChangeFile}`);
            if (config.resolveCopy?.some(item => changeFile.startsWith(item)))
                fse.copySync(changeFile, outputPath);

            else if (stat.isFile())
                transformFile(changeFile, outputPath, config, log);

            else if (stat.isDirectory())
                compilerPkg(changeFile, outputPath, config);
        });
}

function compilerPkgs(pkgs, globalConfig) {
    pkgs.forEach(async (pkgName) => {
        const sourceCodeDir = getPkgSourcePath(pkgName);
        if (fs.existsSync(sourceCodeDir)) {
            const log = genLog(pkgName);
            const config = await getPkgConfig(globalConfig, pkgName);
            const outputDir = getOutputPath(config, pkgName);

            cleanBeforeCompilerResult(pkgName, log);
            const type = config.target === 'browser' ? ESM_OUTPUT_DIR : NODE_CJS_OUTPUT_DIR;
            log(chalk.white(`Build ${type} with babel`));
            compilerPkg(sourceCodeDir, outputDir, config, log);
            if (argv.watch) {
                log(chalk.magenta(`Start watch ${SOURCE_DIR} directory...`));
                watchFile(sourceCodeDir, outputDir, config, log);
            }
        }
    });
}

function main() {
    const globalConfig = getGlobalConfig();
    const pkgs = getNeedCompilerPkg(globalConfig);

    compilerPkgs(pkgs, globalConfig);
}

main();
