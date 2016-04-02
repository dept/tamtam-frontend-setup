'use strict';

// @formatter:off

var angular                 = require( 'angular' );

							// pull in angular dependencies
							//  require('angular-sanitize');
							//  require('angular-resource');
							//  require('angular-ui-router');
							//  require('angular-animate');

var config                	= require( '../../config' );

var appConfig               = require( './config' );
var appRoutes               = require( './routing' );
var appConstants            = require( './constants' );
var appRun                  = require( './run' );
var debug					= config.debug;


var MODULE_NAME				= 'module';

// @formatter:on


// Set up our main application module
// @param: String -> Module name as supplied to the ng-app directive wich we use for auto bootstrapping the app
// @param: Array -> Array of dependencies, we inject the ngRoute(used to set up routing)
// 	and ngAnimate(used for animation) modules. In other words the module depends on the injected modules to function properly
var angularModule = angular.module( MODULE_NAME, [ 'ngResource', 'ui.router', 'angular-loading-bar', 'ngAnimate', 'ngSanitize' ] );


// @formatter:off

// Directives
angularModule.directive( 'example',            			require( '../../directives/example' ) );

// Animations
angularModule.animation( '.example',					require( '../../animation/example' ) );

// Controllers
angularModule.controller( 'ExampleController',			require( '../../controllers/example' ) );

// Interceptors
angularModule.factory( 'ExampleInterceptor',       		require( '../../interceptors/example' ) );

// Transformers
angularModule.factory( 'ExampleTransformRequest',		require( '../../transformers/example' ) );

// Services
angularModule.factory( 'ExampleService',				require( '../../services/example' ) );

// @formatter:on


// set config
angularModule.config( appConfig );
angularModule.config( appRoutes );


// Sets up all the constants
for ( var key in appConstants ) angularModule.constant( key, appConstants[ key ] );


// Run forrest run!
angularModule.run( appRun );


// @return: Angular module -> Angular module which exposes the module API
module.exports = angularModule;