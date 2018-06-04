//@formatter:off

const requireCached     		    = require('../src/gulp/require-cached');
const config                      = require('../config');
const log                         = require('../src/debug/log');
const path                        = require('path');

const gulp                        = requireCached('gulp');
const browserSync                 = requireCached('browser-sync');
const sass                        = requireCached('gulp-sass');
const sourcemaps                  = requireCached('gulp-sourcemaps');
const autoprefixer                = requireCached('gulp-autoprefixer');
const gulpIf                      = requireCached('gulp-if');
const gulpCleanCss                = requireCached('gulp-clean-css');
const gulpSize                    = requireCached('gulp-size');
const uncss                       = requireCached('gulp-uncss');

/**
 * Task for compiled SASS files back to CSS, uses lib-sass instead of ruby for faster compiling.
 * Depending on the settings it will also remove unused CSS lines, add source maps and minify the output.
 *
 * @see https://www.npmjs.com/package/gulp-sass
 * @see http://libsass.org/
 * @see: https://github.com/sindresorhus/gulp-size
 */
gulp.task('css', function () {

    console.log('HALLO DIT WERKT!!!');

} );

