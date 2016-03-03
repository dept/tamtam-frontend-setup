// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');
var log                     = require('../src/debug/log');

var nodePath                = requireCached('path');
var gulp                    = requireCached('gulp');
var gulpMarkdown            = requireCached('gulp-markdown');
var gulpCheerio            	= requireCached('gulp-cheerio');
var gulpWrapper            	= requireCached('gulp-wrapper');
var safeReadSync			= require('../src/node/file/safe-read-file-sync');


// @formatter:on


gulp.task( 'readme', function () {

	var options = {

		css: './gulpfile.js/assets/readme/readme.min.css',

		source: './README.md',
		dest: config.dest.getPath( 'html' ),


		wrapper: {
			// Wrapper options are set later with the inline CSS
		}

	};

	var css = safeReadSync( options.css ) || '';

	options.wrapper.header = '<html><head><meta charset=\"utf-8\"><style>' + css + '</style></head><body><article class=\"markdown-body\">';
	options.wrapper.footer = '</article></body></html>';


	return gulp.src( options.source )
		.pipe( gulpMarkdown() )
		.pipe( gulpWrapper( options.wrapper ) )
		.pipe( gulp.dest( options.dest ) );

} );


