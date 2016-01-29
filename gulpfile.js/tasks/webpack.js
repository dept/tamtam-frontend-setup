//@formatter:off

var requireCachedModule         = require('../util/requireCachedModule');
var config                      = require('../config');
var log                         = require('../util/log');
var path                        = require('path');

var gulp                        = requireCachedModule('gulp');
var browserSync                 = requireCachedModule('browser-sync');
var webpack                     = requireCachedModule('webpack');
var sourcemaps                  = requireCachedModule('gulp-sourcemaps');
var autoprefixer                = requireCachedModule('gulp-autoprefixer');
var gulpIf                      = requireCachedModule('gulp-if');
var gulpMinCss                  = requireCachedModule('gulp-minify-css');
var gulpSize                    = requireCachedModule('gulp-size');
var uncss                       = requireCachedModule('gulp-uncss');
var gulpIgnore                  = requireCachedModule('gulp-ignore');

/**
 * Task for compiled SASS files back to CSS, uses lib-sass instead of ruby for faster compiling.
 * Depending on the settings it will also remove unused CSS lines, add source maps and minify the output.
 *
 * @see https://www.npmjs.com/package/gulp-sass
 * @see http://libsass.org/
 * @see: https://github.com/sindresorhus/gulp-size
 */
gulp.task('webpack', function (callback) {


	// @see: http://webpack.github.io/docs/configuration.html
    var options = {

        webpack: {

			debug: true,
			//context: __dirname + "/app",		// Default: process.cwd()
			//context: path.resolve( config.source.getPath('root'), config.source.getPath('javascript')),

			//entry: config.source.getPath('javascript', 'main'),
			entry: './source/javascript/main.js',

			output: {
					path: config.dest.getPath('javascript'),
					filename: "[name].js"
				}


        }


    };
	

    //@formatter:on
	//
	//// Keep track of the file size changes
	//var sizeBefore = gulpSize( { showFiles: true } );
	//var sizeAfter = gulpSize( { showFiles: true } );


	console.log( process.cwd() );

		console.log(options.webpack);

	webpack( options.webpack, function ( error, status ) {


		console.log( error );

		//browserSync.reload();

		callback();


	} );


	//return gulp.src( config.source.getFiles( 'javascript' ) )
	//
	//	.pipe( gulpIf( config.sourcemaps, sourcemaps.init() ) )
	//
	//	// start optimizing...
	//	//.pipe( gulpIf( options.minify, sizeBefore ) )
	//
	//	// sourcemaps need a relative path from the output folder
	//	.pipe( gulpIf( config.sourcemaps, sourcemaps.write( path.relative( config.dest.getPath( 'javascript' ), config.dest.getPath( 'sourcemaps' ) ) ) ) )
	//
	//	.pipe( gulp.dest( config.dest.getPath( 'css' ) ) )
	//
	//	//.pipe( gulpBless() ) TODO: split css for IE9
	//	.pipe( gulp.dest( config.dest.getPath( 'css' ) ) )
	//
	//	.pipe( gulpIf( options.minify, sizeAfter ) )
	//
	//	.pipe( browserSync.stream() );

	//.pipe( browserSync.reload( { stream: true } ) );

} );



