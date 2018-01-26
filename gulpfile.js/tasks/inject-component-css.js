// @formatter:off

var requireCached = require('../src/gulp/require-cached');
var config = require('../config');
var runSequence = require('run-sequence');
var path = require('path');

var gulp = requireCached('gulp');
var inject = requireCached('gulp-inject');
var sort = requireCached('gulp-sort');

// @formatter:on

/**
 * Task for injecting scss
 */
gulp.task('inject-component-css', function () {

    var injectComponentsFiles = gulp.src([
        path.join(config.source.getPath('components'), '**/*.scss')
    ], { read: false });

    var injectComponentsOptions = {
        transform: (filePath) => `@import '${filePath}';`,
        starttag: '/* components:scss */',
        endtag: '/* endinject */',
        addRootSlash: false
    };

    return gulp.src(config.source.getFileGlobs('css'))
        .pipe(inject(injectComponentsFiles, injectComponentsOptions))
        .pipe(gulp.dest(file => file.base));

});
