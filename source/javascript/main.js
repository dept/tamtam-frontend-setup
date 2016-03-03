"use strict";

// 	This is your main JavaScript entry point file.
//	'require' any files here that you wish to include in your JS bundle.
// 	If you would like to create another JS bundle, simply add another JS file to the root of your JS folder.


// When using AngularJS you can just require the needed module(s) so they get compiled with the JS
// NOTE: you only need the path to the folder, as the index.js will be automatically grabbed.
// NOTE: the variable syntax for AngularJS has been modified to work with Nunjucks,
//  see: ./src/angular/_modules/example/config.js
//  {{ variable }} = Nunjucks
//  <% variable %> = AngularJS
//
//var exampleAngularModule        = require('./src/angular/_modules/example');



// Here is a small script that explains more about how to use CommonJS require function
// Inspect this file to learn more about how you can use CommonJS modules.
require('./src/examples/how-to-use-common-js');



// Here are some examples on how to bind your module scripts to the HTMLElements

// We require the module init function here..
// This function will instantiate all modules found with a given selector.
var moduleInit 					= require( './src/modules/util/module-init' );

// We require the module constructor like so:
var ExampleModule 				= require( './src/modules/example' );
var ExampleArgumentsModule 		= require( './src/modules/example-2' );


// Instantiate your modules like this:
// 	The first argument is a selector used to find the elements within the document
// 	The second argument is the constructor used to instantiate the module
// 	The third optional argument, you can supply an Array with extra arguments to pass onto the constructor.
// A reference to the HTMLElement will be supplied to the constructor (along with extra arguments if supplied).
moduleInit( '.js-module-example', 	ExampleModule );
moduleInit( '.js-module-example-2', ExampleArgumentsModule, [ 'some argument', true ] );

// NOTE: this shortcut would work just as well:
// moduleInit( '.js-module-example', require( './src/modules/example' ) );
