// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');
var log                     = require('../src/debug/log');

var gulp                    = requireCached('gulp');
var gulpZip                 = requireCached('gulp-zip');


// @formatter:on


gulp.task('zip', function () {

    var options = {

            fileName: config.name + '-' +  config.version + '.zip',
            source:config.dest.getPath('root', '**'),
            dest:config.dest.getPath('root')

    };

    return gulp.src(options.source)
        .pipe(gulpZip(options.fileName))
        .pipe(gulp.dest(options.dest));
});