/**
 * A function to instantiate all modules within the document
 * @param selector {string} the selector used to select a module
 * @param constructor {function} the function to create a new instance of the module
 * @param opt_arguments {=array} extra arguments to pass onto the module constructor, after the element.
 */
function moduleInit( selector, constructor, opt_arguments ) {

	// grab all the module elements
	var moduleElements = document.querySelectorAll( selector );
	var moduleInstances = [];

	// loop through all the elements and instantiate the module
	for ( var i = 0, leni = moduleElements.length; i < leni; i++ ) {

		var element = moduleElements[ i ];

		// check if the module has not already been instantiated on this element
		if( element._isInitialized ) continue;
		element._isInitialized = true;


		if( !opt_arguments ) {

			// create new module and save it into the Array
			moduleInstances.push( new constructor( element ) );

		} else {

			// if an Array with extra arguments have been given, push them into an arguments array
			// the first argument will the context for the function, can be null because the context will be reset by the new operator
			// the seconds argument is actually the first argument to be passed onto the constructor, so in this case the HTMLElement.
			var constructorArguments = [ null, element ];
			Array.prototype.push.apply( constructorArguments, opt_arguments );

			// create new module with the arguments and save it into the Array
			// @see: http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
			moduleInstances.push( new ( constructor.bind.apply( constructor, constructorArguments ) )() );

		}

	}

	// Return all the instances that have been created
	return moduleInstances;

}

// Export the module init function
module.exports = moduleInit;