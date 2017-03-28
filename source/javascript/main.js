"use strict";

// 	This is your main JavaScript entry point file.
//	import all files here that you wish to include in your JS bundle.
// 	If you would like to create another JS bundle, simply add another JS file to the root of your JS folder.

// Here is a small script that explains more about how to use imports.
// Inspect this file to learn more about how you can use CommonJS modules.
import './src/examples/how-to-use-imports';


// Here are some examples on how to bind your module scripts to the HTMLElements

// We import the module init function here..
// This function will instantiate all modules found with a given selector.
import moduleInit from './src/modules/util/module-init';

// We require the module constructor like so:
import ExampleModule from './src/modules/example';
import ExampleArgumentsModule from './src/modules/example-2';

// Instantiate your modules like this:
// 	The first argument is a selector used to find the elements within the document
// 	The second argument is the constructor used to instantiate the module
// 	The third optional argument, you can supply an Array with extra arguments to pass onto the constructor.
// A reference to the HTMLElement will be supplied to the constructor (along with extra arguments if supplied).
moduleInit( '.js-module-example', 	ExampleModule );
moduleInit( '.js-module-example-2', ExampleArgumentsModule, [ 'some argument', true ] );

// NOTE: this shortcut would work just as well:
// moduleInit( '.js-module-example', require( './src/modules/example' ) );
