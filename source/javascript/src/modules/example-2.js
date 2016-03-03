// @formatter:off

// List the module dependencies here


// @formatter:on


/**
 * Example module, this represent a single instance of a module
 * Use this in combination with the module-init function to easily create new instances of this module.
 * @param element {HTMLElement} the element of the module
 * @param stringArgs {string} some string argument
 * @param booleanArg {boolean} some boolean argument
 * @constructor
 */
function Example2 ( element, stringArgs, booleanArg ) {

	console.log( 'new example module instantiated with these arguments!', arguments );

	// NOTE: We use the querySelector on the element,
	// and not on the document to keep the logic self-contained to this module.
	var _preElement = element.querySelector( 'pre' );

	_preElement.innerHTML = '{string}:\t' + stringArgs + '<br/>{boolean}:\t' + booleanArg

}


// export the constructor function
module.exports = Example2;