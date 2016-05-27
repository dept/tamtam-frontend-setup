//@formatter:off

var requireCached     			= require('../src/gulp/require-cached');
var config                      = require('../config');

var gulp                        = requireCached('gulp');
var gulpIf                      = requireCached('gulp-if');
var gulpAccessibility           = requireCached('gulp-accessibility');
var rename                      = requireCached('gulp-rename');

// @formatter:on

/**
 * Task for checking WCAG2AA requirements
 * @see: https://github.com/yargalot/gulp-accessibility
 */

gulp.task('accessibility', function() {

    var options = {
        checkAccessibility : config.checkAccessibility,
        accessibility : {
            accessibilityLevel: 'WCAG2AA',
            reportLevels: {
                notice: false,
                warning: false,
                error: true
            }
        }
    };

    return gulp.src( config.dest.getPath('root')+"/styleguide.html" )
        .pipe( gulpIf( options.checkAccessibility, gulpAccessibility(options.accessibility) ) );

});
