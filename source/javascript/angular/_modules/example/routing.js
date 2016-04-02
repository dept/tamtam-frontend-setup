'use strict';

// configFunction to register work which needs to be done on module load. As with the module itself dependencies can be injected.
module.exports = function _moduleRouting ( $stateProvider, $urlRouterProvider, Config ) {


	// @formatter:off

    $stateProvider

        .state( 'home', {
			title			: 'Home',
            url				: '/',
            templateUrl 	: Config.views.home
        })
        .state( 'landing', {
			title			: 'Landing',
            url				: '/landing',
            templateUrl 	: Config.views.landing
        })

    $urlRouterProvider.otherwise('/');

}



