// @formatter:off

// List the module dependencies here

var add					= require('../examples/add');
//var $					= window.jQuery;


// @formatter:on


/**
 * Example module, this represent a single instance of a module
 * - so all of its logic is only about a single HTMLElement and its content.
 * Use this in combination with the module-init function to easily create new instances of this module.
 * @param element {HTMLElement} the element of the module
 * @constructor
 */
function Example( element ) {

	// If you are using jQuery you can wrap the element into a jQuery Selection
	// var _$element = $( element );

	// To interact with components of this module make sure to ONLY USE elements from within this module element.
	// This makes sure each instance of this module is self-contained and can co-exist next to each other.
	// example:

	// var _button = _$element.find( '.js-button' );

    // -or- without jQuery:

    // var _button = element.querySelector( '.js-button' )

	// The ONLY elements you could sometimes use that are not contained within the module's element are
	// global ones such as: window, document, <html> and <body>


	// Here is just some example code
	// Feel free to roll your own logic...


	// START OF EXAMPLE

	var _value = 0;

	console.log( 'new example module instantiated!' );

	updateUI();

	element.addEventListener( 'click', handleClickEvent );


	function handleClickEvent ( event ) {

		_value = add( _value, 1 );

		updateUI();

	}


	function updateUI () {

		element.innerHTML = '<span>example module clicks:</span> ' + _value;

	}

	// END OF EXAMPLE
}


// export the constructor function
module.exports = Example;

