// @formatter:off

var MODULE_NAME			= 'example-module';
var MODULE_SELECTOR		= '.js-' + MODULE_NAME;

// @formatter:on


/**
 * Example module, this represent a single instance of the module
 * @param element {HTMLElement} the element of the module
 * @constructor
 */
function ExampleModule ( element ) {

	console.log( 'new example module instantiated!' );

	element.innerHTML = '<span>example module</span>';

	element.addEventListener( 'click', handleClickEvent );


	function handleClickEvent ( event ) {

		console.log( 'you clicked on this module!' );

	}

}


/**
 * Instantiates all module elements that are available.
 */
function init () {

	// grab all the module elements
	var moduleElements = document.querySelectorAll( MODULE_SELECTOR );

	// loop through all the elements and instantiate the module
	for ( var i = 0, leni = moduleElements.length; i < leni; i++ ) {

		var element = moduleElements[ i ];

		// check if the module has not already been instantiated on this element
		if( element.__isInitialized ) continue;
		element.__isInitialized = true;

		// create new module
		new ExampleModule( element );

	}

}


module.exports = {
	init: init,
	constructor: ExampleModule
};