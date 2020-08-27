'use strict';

var gulp = require('gulp');
var express = require('express');
var argv = require('yargs').argv;

var port = argv.p || 8888;
var cwd = process.cwd();

var app = express();
var init = require('../init');

gulp.task('mock', function () {
    init(app, argv, cwd);

    app.set('port', port);
    app.listen(port, function () {
        console.log('cgiMock server listening on ' + port);
    });
});