// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');

var changed                 = requireCached('gulp-changed');
var gulp                    = requireCached('gulp');
var gulpIf                  = requireCached('gulp-if');
var webp                    = requireCached('gulp-webp');

// @formatter:on

/**
 * Task for optimizing images (size).
 * @see https://www.npmjs.com/package/gulp-imagemin
 */
gulp.task('webp', function () {

    var options = {

        webpConfig: {
            optimizationLevel: 3,   // default 3
            progressive: false,     // for JPG, default false
            interlaces: false,      // for GIF, default false
            multipass: false        // for SVG, default false
        }

    };

    return gulp.src( config.source.getFileGlobs( 'images' ) )

        .pipe( changed( config.dest.getPath( 'images' ) ) )                         // Ignore unchanged files
        .pipe( gulpIf( config.webpImages, webp( options.webpConfig ) ) )            // Optimize
        .pipe( gulp.dest( config.dest.getPath( 'images' ) ) );                      // Export

} );
