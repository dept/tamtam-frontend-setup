// @formatter:off

var loadPlugins 				= require( '../util/loadPlugins' );
var log 						= require( '../util/log' );
var startTime 					= process.hrtime();
var config 						= require('../config');
var gulp;


// @formatter:on


function init ( callback ) {

	// Load / Index all the plugins for faster task loading.
	loadPlugins( function () {

		gulpInit( callback );

	}, true, global );

}


function gulpInit ( callback ) {

	// initialization code, no need to touch this.

	require( '../util/loadTasks' )(); // loads all tasks ( if lazy loading is turned off ).

	var requireCachedModule = require( '../util/requireCachedModule' );
	var gulpDecorator = require( '../util/gulpDecorator' );

	gulp = requireCachedModule( 'gulp' );

	gulpDecorator.decorate( gulp ); // Decorate gulp with extra functionality for better debugging and error handling.

	console.log('decorated');
	
	log.time( { sender: 'gulpfile', message: 'init - ', time: process.hrtime( startTime ) } );

	callback( gulp );


}


module.exports = init;