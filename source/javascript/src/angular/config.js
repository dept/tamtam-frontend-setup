'use strict';

// @formatter:off

var environment 			= require( '../system/environment' );
var config 					= {};

environment.setProduction( 	'project.nl' 				);
environment.setTest( 		'project.test.tamtam.nl' 	);

// @formatter:on


if( environment.isLocal || environment.isTest ) {

	config.apiUrl = 'http://project.test.tamtam.nl/api/v1/';

} else {

	// Always default to the live environment in case you messed up the hostname setting.
	config.apiUrl = 'https://www.project.nl/api/v1/';

}



// @formatter:off

// We can turn debug mode on via a query string
config.debug 				= /debug=true/ig.test( window.location.search ) || environment.isLocal;


// API data
config.API                  = {
                                home		: config.apiUrl + 'home',
                                landing		: config.apiUrl + 'landing'
                            };

config.views                = {
								home		: '/home.html',
								landing		: '/landing.html'
                            };


if( environment.isLocal ) {

	// local test data
	config.API.home				= 'json/test/home.json';
	config.API.landing			= 'json/test/landing.json';

}



module.exports = config;
