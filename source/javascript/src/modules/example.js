// List the module dependencies here
var env  = require('../system/environment');


/**
 * Example module, this represent a single instance of a module
 * - so all of its logic is only about a single HTMLElement and its content.
 * Use this in combination with the module-init function to easily create new instances of this module.
 * @param element {HTMLElement} the element of the module
 * @constructor
 */
function Example( element ) {

    this.debug = env.isLocal;

    console.log(env.isLocal);

	var _value = 0;

	console.log( 'new example module instantiated!' );

	updateUI();

	element.addEventListener( 'click', handleClickEvent );


	function handleClickEvent ( event ) {

		_value++;
		updateUI();

	}


	function updateUI () {

		element.innerHTML = '<span>example module clicks:</span> ' + _value;

	}

}


// export the constructor function
module.exports = Example;

