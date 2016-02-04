//@formatter:off

var requireCachedModule         = require('../util/requireCachedModule');
var config                      = require('../config');
var log                         = require('../util/log');
var path                        = require('path');

var gulp                        = requireCachedModule('gulp');
var browserSync                 = requireCachedModule('browser-sync');
var webpack                     = requireCachedModule('webpack');
var sourcemaps                  = requireCachedModule('gulp-sourcemaps');

/**
 * Task for compiled SASS files back to CSS, uses lib-sass instead of ruby for faster compiling.
 * Depending on the settings it will also remove unused CSS lines, add source maps and minify the output.
 *
 * @see https://www.npmjs.com/package/gulp-sass
 * @see http://libsass.org/
 * @see: https://github.com/sindresorhus/gulp-size
 */
gulp.task('js', function (callback) {

	// @formatter:on
	// @see: http://webpack.github.io/docs/configuration.html
	var options = {

		webpack: {

			debug: false,

			entry: config.source.getFilePaths( 'javascript' ),

			output: {
				path: config.dest.getPath( 'javascript' ),
				filename: "[name].js"
			},

			plugins: [
				new webpack.SourceMapDevToolPlugin(
					'[file].map', null,
					"[absolute-resource-path]", "[absolute-resource-path]")
			]
		}

	};


	webpack( options.webpack, function ( error, status ) {

		//console.log( error, status );
		//browserSync.reload();

		callback();

	} );


} );



