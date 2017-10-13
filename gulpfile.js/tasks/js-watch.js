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

    var initialCompile = true;
    var previousStats;

    webpack(js.config).watch(200, function (error, stats) {

        if (stats.stats) {

            stats.stats.forEach(stat => {

                js.onWebpackCallback(error, stat, previousStats);

                if (!stat.compilation.errors && stat.compilation.errors.length) browserSync.reload();

                if (initialCompile) {

                    initialCompile = false;

                    callback();

                }

            });

        } else {

            js.onWebpackCallback(error, stats, previousStats);

            if (!stats.compilation.errors && stats.compilation.errors.length) browserSync.reload();

            if (initialCompile) {

                initialCompile = false;
                callback();

            }

        }

        previousStats = stats;

        browserSync.reload();

    });

});



