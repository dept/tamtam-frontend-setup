//@formatter:off

var requireCached     			= require('../src/gulp/require-cached');
var config                      = require('../config');
var log                         = require('../src/debug/log');
var path                        = require('path');

var gulp                        = requireCached('gulp');
var browserSync                 = requireCached('browser-sync');
var webpack                     = requireCached('webpack');
var sourcemaps                  = requireCached('gulp-sourcemaps');

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

			debug: config.debug,

			entry: config.source.getFilePaths( 'javascript', true ),

			output: {
				path: config.dest.getPath( 'javascript' ),
				filename: "[name].js"
			},

			plugins: []
		},

		uglify: {

			mangle: true, 				// Pass false to skip mangling names.
			preserveComments: false 	// 'all', 'some', {function}

		}

	};


	if( config.sourcemaps ) options.webpack.sourcetool = 'source-map';

	if( config.minify ) {

		options.webpack.plugins.push( new webpack.optimize.DedupePlugin() );
		options.webpack.plugins.push( new webpack.optimize.UglifyJsPlugin() );
		options.webpack.plugins.push( new webpack.NoErrorsPlugin( options.uglify ) );

	}


	webpack( options.webpack, function ( error, status ) {

		if(error) {

			log.error( error );

		}

		browserSync.reload();

		callback();

	} );


} );



