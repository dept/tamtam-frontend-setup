// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');
var log                     = require('../src/debug/log');
var mergeJSONData           = require('../src/data/json/merge');
var getFileList             = require('../src/node/file/get-list');
var packageJSON             = require('../../package.json');
var SvgExtension            = require('../src/template/nunjucks/svg-extension');
var DebugExtension          = require('../src/template/nunjucks/debug-extension');

var path                    = require('path');
var mkdirp                  = requireCached('mkdirp');
var gulp                    = requireCached('gulp');
var gulpData                = requireCached('gulp-data');
var gulpNunjucks            = requireCached('gulp-nunjucks-render');
var htmlmin                 = requireCached('gulp-htmlmin');
var gulpif                  = requireCached('gulp-if');
var browserSync             = requireCached('browser-sync');
var prettify                = requireCached('gulp-jsbeautifier');
var glob                    = requireCached('glob');


var RESERVED_DATA_KEYWORDS  = [ 'project', 'ext' ];


//@formatter:on

/**
 *  Gulp task responsible for compiling the templates into normal HTML using Mozilla nunjucks templates
 *  @see: http://mozilla.github.io/nunjucks/api.html
 *  @see: https://www.npmjs.com/package/gulp-nunjucks-render
 */
gulp.task( 'html', function () {

	var options = {};

	options.minify = config.minifyHTML;

	// @formatter:off
    options.htmlmin = {

        collapseWhitespace: true,
        removeComments:     true,
        minifyJS:           true,
        minifyCSS:          true,
        keepClosingSlash:   true // can break SVG if not set to true!

    };
    // @formatter:on


	// @see: https://www.npmjs.com/package/gulp-jsbeautifier
	options.pretty = config.prettyHTML;
	options.prettyConfig = {

		html: {
			unformatted: [ "sub", "sup", "b", "i", "u", "svg", "pre" ],
			wrapAttributes: 'auto'
		}

	};


	options.nunjuck = {

		// useful for Angular projects
		//tags: {
		//    blockStart: '<%',
		//    blockEnd: '%>',
		//    variableStart: '<$',
		//    variableEnd: '$>',
		//    commentStart: '<#',
		//    commentEnd: '#>'
		//},

		watch: false


	}


	var contextData = {};
	var jsonData = mergeJSONData( config.source.getPath( 'data' ), config.source.getFileGlobs( 'data' ) );

	// merge retrieved data into the context object
	for ( var key in jsonData ) {

		if( RESERVED_DATA_KEYWORDS.indexOf( key ) >= 0 ) {

			log.error( {
				sender: 'html',
				message: 'A data object has been given a reserved keyword as a name, please update the file name : ' + key + '.\nReserved keywords: ' + RESERVED_DATA_KEYWORDS
			} );

		} else {

			contextData[ key ] = jsonData[ key ];

		}

	}

	var pagesList = getFileList( config.source.getFileGlobs( 'html' ), config.source.getPath( 'html' ) );
	var svgList = getFileList( config.source.getFileGlobs( 'svg' ), config.source.getPath( 'svg' ), true );

	contextData.project = {
		name: packageJSON.name,
		description: packageJSON.description,
		author: packageJSON.author,
		version: packageJSON.version,
		debug: config.debug,
		pages: pagesList,
		svgs: svgList
	}


	function getDataForFile ( file ) {

		return contextData;

	}


	var environment = gulpNunjucks.nunjucks.configure( [ config.source.getPath( 'html' ) ], options.nunjuck );

	environment.addExtension( 'SVGExtension', new SvgExtension( gulpNunjucks.nunjucks ) );
	environment.addExtension( 'DebugExtension', new DebugExtension( gulpNunjucks.nunjucks ) );


	return gulp.src( config.source.getFileGlobs( 'html' ), { base: config.source.getPath( 'html' ) } )

		.pipe( gulpData( getDataForFile ) )
		.pipe( gulpNunjucks() )


		.pipe( gulpif( options.pretty, prettify( options.prettyConfig ) ) )
		.pipe( gulpif( options.minify, htmlmin( options.htmlmin ) ) )

		.pipe( gulp.dest( config.dest.getPath( 'html' ) ) );

	// Browser Sync is reloaded from the watch task for HTML files to bypass a chrome bug.
	// See the watch task for more info.

} );
