//@formatter:off
var js = require('./js');

var config = require('../config');
var log = require('../src/debug/log');
var requireCached = require('../src/gulp/require-cached');

var browserSync = requireCached('browser-sync');
var gulp = requireCached('gulp');
var webpack = requireCached('webpack');

// @formatter:on

gulp.task('js-watch', function jsWatch(callback) {

    Promise.all(js.createCompilerPromise())
        .then(() => {

            callback();
            browserSync.reload();

        })
        .catch(e => console.warn('Error whilst compiling JS', e));

});
