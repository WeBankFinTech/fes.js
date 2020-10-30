/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const webpackConfig = require('./webpack.test.config.js');
const generateConfig = require('../helpers/config');
const log = require('../helpers/log');

const configs = generateConfig();


let projectKarmaConfig;
const projectKarmaConfigFile = path.resolve(configs.folders.PROJECT_DIR, 'karma.config.js');
if (fs.existsSync(projectKarmaConfigFile)) {
    log.message('[fes] 加载项目karma配置');
    projectKarmaConfig = require(projectKarmaConfigFile);
}

module.exports = function (config) {
    const defaultConfig = projectKarmaConfig || {
        test: ['test/**/*.spec.js'],
        coverage: ['src/components/**/*', 'src/helpers/**/*']
    };
    const testFiles = defaultConfig.test || [];
    const coverageFiles = config.coverage ? (defaultConfig.coverage || []) : [];
    const files = [].concat(testFiles, coverageFiles);
    const preprocessors = {};
    testFiles.forEach((item) => {
        preprocessors[item] = ['webpack', 'sourcemap'];
    });
    coverageFiles.forEach((item) => {
        preprocessors[item] = ['webpack', 'coverage'];
    });
    const reporters = [];
    if (files.length) {
        reporters.push('mocha');
    }
    if (coverageFiles.length) {
        reporters.push('coverage-istanbul');
    }
    config.set({
        basePath: configs.folders.PROJECT_DIR,
        frameworks: ['mocha'],
        files,
        preprocessors,
        webpack: webpackConfig,
        reporters,
        coverageIstanbulReporter: {
            dir: path.join(configs.folders.PROJECT_DIR, '.coverage'),
            reports: ['lcov', 'text'],
            fixWebpackSourcePaths: true
        },
        browsers: ['Chrome']
    });
};
