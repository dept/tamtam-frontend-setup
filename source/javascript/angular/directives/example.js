'use strict';

// @formatter:off

// list the dependencies here

//var dependency 			= require('../../.');

// @formatter:on


/**
 * Example directive
 */
module.exports = function () {


	function link ( $scope, $element, $attr ) {

		// @formatter:off

		//var _button				= $element.find('.js-button');

		// @formatter:on
		

		$scope.$on( '$destroy', onDestroy );


		function onDestroy () {

			// remove event listeners and objects so the garbage collector can collect this instance

			// example
			// if( _button ){
			// 	_button.removeEventListener( 'click', handleClick );
			// 	_button = undefined;
			// }

		}


	}


	return {
		restrict: 'A',
		link: link
	};

}