/**
 * Created by harrywan on 2017/3/9.
 */
var http = require('http');
var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var webpack = require('webpack');
var del = require('del');
var argv = require('yargs')
    .default('demand', false)
    .argv;
var app = require('./createServer');

// A callback function to handle error
function handleError(err) {
    new gutil.PluginError('sass', err);
}

// Task clean
gulp.task('clean', function () {
    del('../dist');
});

// Webpack packaging
var webpackDistDevConfig = require('./webpack.dist.config.js');
var webpackDistProdConfig = require('./webpack.dist.prod.config.js');
gulp.task('webpack.dist.dev', function (callback) {
    webpack(webpackDistDevConfig, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack.dist.dev', err);
        gutil.log(
            '[webpack.dist.dev]',
            stats.toString({
                chunks: false,
                colors: true,
                timings: true
            })
        );
        callback();
    });
});
gulp.task('webpack.dist.prod', function (callback) {
    webpack(webpackDistProdConfig, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack.dist.prod', err);
        gutil.log(
            '[webpack.dist.prod]',
            stats.toString({
                chunks: false,
                colors: true,
                timings: true
            })
        );
        callback();
    });
});
gulp.task('webpack.dist', ['webpack.dist.dev', 'webpack.dist.prod']);

// 编译sass
gulp.task('css', function () {
    return gulp
        .src('../src/styles/index.scss')
        .pipe(sass())
        .on('error', handleError)
        .pipe(
            autoprefixer({
                browsers: [
                    'last 2 versions',
                    'ie > 8',
                    'Chrome > 30',
                    'Firefox > 20'
                ]
            })
        )
        .pipe(rename('fes-ui.css'))
        .pipe(gulp.dest('../dist/styles'))
        .pipe(cleanCSS())
        .pipe(rename('fes-ui.min.css'))
        .pipe(gulp.dest('../dist/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp
        .src('../src/styles/iconfont/*.*')
        .pipe(gulp.dest('../dist/styles/iconfont'));
});

gulp.task('build', ['css', 'fonts', 'webpack.dist']);

gulp.task('dev', function () {
    http.createServer(app(argv.demand)).listen(8000);
});
