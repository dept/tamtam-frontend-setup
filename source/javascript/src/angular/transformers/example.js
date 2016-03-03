'use strict';

// @formatter:off

var angular 					= require( 'angular' );

// @formatter:on

module.exports = function () {

	return function ( data, headers ) {

		var data = JSON.parse( data );


		return angular.fromJson( data );
	}

};

