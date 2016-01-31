// @formatter:off

var requireCachedModule     = require('../util/requireCachedModule');
var config                  = require('../config');

var changed                 = requireCachedModule('gulp-changed');
var gulp                    = requireCachedModule('gulp');
var gulpIf                  = requireCachedModule('gulp-if');
var imagemin                = requireCachedModule('gulp-imagemin');
var webp                    = requireCachedModule('gulp-webp');

// @formatter:on

/**
 * Task for optimizing images (size).
 * @see https://www.npmjs.com/package/gulp-imagemin
 */
gulp.task('images', function () {

    var options = {

        imageConfig: {
            optimizationLevel: 3,   // default 3
            progressive: false,     // for JPG, default false
            interlaces: false,      // for GIF, default false
            multipass: false        // for SVG, default false
        },
        
        webpConfig: {
            optimizationLevel: 3,   // default 3
            progressive: false,     // for JPG, default false
            interlaces: false,      // for GIF, default false
            multipass: false        // for SVG, default false
        }

    };

    return gulp.src( config.source.getFiles( 'images' ) )

        .pipe( changed( config.dest.getPath( 'images' ) ) )                         // Ignore unchanged files
        .pipe( gulpIf( config.optimizeImages, imagemin( options.imageConfig ) ) )   // Optimize
        .pipe( gulp.dest( config.dest.getPath( 'images' ) ) )                       // Export
        .pipe( gulpIf( config.webpImages, webp( options.webpConfig ) ) )            // Optimize
        .pipe( gulp.dest( config.dest.getPath( 'images' ) ) );                      // Export

} );
