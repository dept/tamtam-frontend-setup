//@formatter:off

var path                        = require('path');
var _                        	= require('lodash');

var js							= require('./js');

var config                      = require('../config');
var log                         = require('../src/debug/log');
var objectDiff					= require('../src/object/diff');
var requireCached     			= require('../src/gulp/require-cached');

var browserSync                 = requireCached('browser-sync');
var gulp                        = requireCached('gulp');
var webpack                     = requireCached('webpack');
// @formatter:on


gulp.task( 'js-watch', function jsWatch ( callback ) {

	var initialCompile = true;
	var fileTimestamps;

	js.apply( this, [ initialCompile ? callback : undefined ] ).watch( 200, function ( error, stats ) {

		if( error ) log.error( {
			sender: 'js-watch',
			data: [ error ]
		} );

		//log.info( {
		//	sender: 'js-watch',
		//	data: [ status ]
		//} );

		var currentTimestamps = stats.compilation.fileTimestamps;

		if( fileTimestamps && !_.isEmpty( fileTimestamps ) ) {

			var diff = objectDiff( fileTimestamps, currentTimestamps );
			var sourceRoot = path.resolve( config.source.getPath( 'root' ), '../' );
			var changedFiles = [];

			for ( var filePath in diff ) changedFiles.push( filePath.replace( sourceRoot, '' ) );

			log.info( {
				sender: 'js-watch',
				message: 'changed files:',
				data: changedFiles.join( '\n\t' )
			} )

		}


		var compErrors = stats.compilation.errors;
		if( compErrors && compErrors.length ) {

			for ( var i = 0, leni = compErrors.length; i < leni; i++ ) {
				var compError = compErrors[ i ];
				log.error( {
					sender: 'js-watch',
					name: compError.name,
					message: compError.message
				} )
			}

		} else {

			browserSync.reload();

		}


		if( !_.isEmpty( currentTimestamps ) ) fileTimestamps = currentTimestamps;

	} );

	initialCompile = false;


} );

module.exports = js;



