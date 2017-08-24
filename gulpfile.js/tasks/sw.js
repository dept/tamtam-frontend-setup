var requireCached     		= require('../src/gulp/require-cached');
var log                     = require('../src/debug/log');
var config                  = require('../config');

var gulp                    = requireCached('gulp');
var changed                 = requireCached('gulp-changed');
var stripDebug              = requireCached('gulp-strip-debug');

/**
 *  Gulp task for copying serviceWorker to backend
 */
gulp.task('sw', function () {

    return gulp.src( config.source.getFileGlobs('sw'))
        .pipe( changed( config.source.getPath( 'sw' ) ) )
        .pipe(stripDebug())
        .pipe(gulp.dest(config.dest.getPath( 'sw' )));

});
