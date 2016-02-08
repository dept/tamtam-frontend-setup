// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');
var log                     = require('../src/debug/log');

var path                    = require('path');
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
                { removeTitle: true },
                { removeComments: true }
				//{ removeUnknownsAndDefaults: false } Useful for when adding aria-labels / roles to svg tags.
            ]
        }

    };


    return gulp.src( config.source.getFileGlobs( 'svg' ) )

        .pipe( changed( config.dest.getPath( 'svg' ) ) )        // Ignore unchanged files
        .pipe( svgmin( options.svgmin ) )                       // Optimize
        .pipe( gulp.dest( config.dest.getPath( 'svg' ) ) )      // Export

} );
