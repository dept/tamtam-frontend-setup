// @formatter:off

var requireCached           = require('../src/gulp/require-cached');
var config                  = require('../config');
var log                     = require('../src/debug/log');
var fileEmptyCheck          = require('../src/function/file-empty-check');

var changed                 = requireCached('gulp-changed');
var gulp                    = requireCached('gulp');
var svgmin                  = requireCached('gulp-svgmin');
var glob                    = requireCached('glob');
var mkdirp                  = requireCached('mkdirp');

// @formatter:on


/**
 * Task for optimizing svg images and making them available in the markup.
 * @see https://www.npmjs.com/package/gulp-svgmin
 */
gulp.task( 'svg', function () {

    var options = {

        svgmin: {
            js2svg: {
                pretty: false // pretty printed svg
            },
            plugins: [
                { cleanupIDs: false },               //Set to false for WCAG reasons
                { removeTitle: false },              //Set to false for WCAG reasons
                { removeComments: true },
                { removeUnknownsAndDefaults: false } //Useful for when adding aria-labels / roles to svg tags.
            ]
        }

    };


    return gulp.src( config.source.getFileGlobs( 'svg' ) )

        .pipe( changed( config.dest.getPath( 'svg' ) ) )        // Ignore unchanged files
        .pipe( fileEmptyCheck() )
        .pipe( svgmin( options.svgmin ) )                       // Optimize
        .pipe( gulp.dest( config.dest.getPath( 'svg' ) ) )      // Export

} );