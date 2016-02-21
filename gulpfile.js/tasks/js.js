//@formatter:off

var requireCached     			= require('../src/gulp/require-cached');
var config                      = require('../config');
var log                         = require('../src/debug/log');
var path                        = require('path');

var gulp                        = requireCached('gulp');
var webpack                     = requireCached('webpack');



function js (callback) {

	// @formatter:on
	// @see: http://webpack.github.io/docs/configuration.html
	var options = {

		webpack: {

			bail: config.throwError,

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


	if( options.webpack.entry.length > 1 ) {

		var entries = options.webpack.entry;
		var webpackEntries = {};

		for ( var i = 0, leni = entries.length; i < leni; i++ ) {

			var entryPath = entries[ i ];
			var pathObject = path.parse( entryPath );

			webpackEntries[ pathObject.name ] = entryPath;

		}

		options.webpack.entry = webpackEntries;

	}


	if( config.sourcemaps ) options.webpack.devtool = 'source-map';

	if( config.minify ) {

		options.webpack.plugins.push( new webpack.optimize.DedupePlugin() );
		options.webpack.plugins.push( new webpack.optimize.UglifyJsPlugin( options.uglify ) );
		options.webpack.plugins.push( new webpack.NoErrorsPlugin() );

	}

	return webpack( options.webpack, function ( error, status ) {

		if( error ) log.error( error );

		var compErrors = status.compilation.errors;
		if( compErrors && compErrors.length ) {

			for ( var i = 0, leni = compErrors.length; i < leni; i++ ) {
				var compError = compErrors[ i ];
				log.error( {
					sender: 'js',
					name: compError.name,
					message: compError.message
				} )
			}

		}


		callback();

	} );

}

gulp.task('js', js);

module.exports = js;



