"use strict";

// 	This is your main JavaScript entry point file.
//	'require' any files here that you wish to include in your JS bundle.
// 	If you would like to create another JS bundle, simply add another JS file to the root of your JS folder.


// We require the module init function here..
// This function will instantiate all modules found with a given selector.
var moduleInit 					= require( './src/modules/util/module-init' );


// We require the module constructor like so:
var ExampleModule 				= require( './src/modules/example' );


// Instantiate your modules like this:
// The first argument is a selector used to find the elements within the document
// The second argument is the constructor used to instantiate the module
// The third optional argument, you can supply an Array with extra arguments to pass onto the constructor.
// A reference to the HTMLElement will be supplied to the constructor (along with extra arguments if supplied).
moduleInit( '.js--module-example', 	ExampleModule );
