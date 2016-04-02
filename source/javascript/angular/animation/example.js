'use strict';

// @formatter:off

// list the dependencies here

//var dependency 			= require('../../.');

// @formatter:on


/**
 * Small example for an ngAnimate animation implementation
 * @returns {{enter: onTransitionIn, move: onTransitionMove, leave: onTransitionOut}}
 */
module.exports = function () {

	function onTransitionIn ( element, doneFn ) {

		onTransitionInComplete( element, doneFn );

	}

	function onTransitionInComplete ( element, doneFn ) {

		doneFn();

	}

	function onTransitionOut ( element, doneFn ) {

		onTransitionOutComplete( element, doneFn );

	}

	function onTransitionOutComplete ( element, doneFn ) {

		doneFn();

	}

	function onTransitionMove ( element, doneFn ) {

		doneFn();

	}


	return {
		enter: onTransitionIn,

		move: onTransitionMove,

		leave: onTransitionOut
	}
}