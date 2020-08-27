'use strict';

var chalk = require('chalk');
var gutil = require('gulp-util');
var Q = require('q');

module.exports = {
    error: function (msg) {
        return gutil.log(chalk.red(msg));
    },
    warn: function (msg) {
        return gutil.log(chalk.yellow(msg));
    },
    message: function (msg) {
        return gutil.log(chalk.cyan(msg));
    },
    log: function () {
        return gutil.log.apply(gutil, arguments);
    },
    prompt: function (msg) {
        var deferred = Q.defer();
        process.stdout.write(chalk.cyan(msg), 'utf-8');
        process.stdin.setEncoding('utf8');

        process.stdin.on('readable', function () {
            var chunk = process.stdin.read();

            if (chunk !== null) {
                process.stdin.end();
                deferred.resolve(chunk.trim());
            }
        });
        process.stdin.on('error', function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
};