"use strict";


// 	This is your main JavaScript entry point file.
//	'require' any files here that you wish to include in your JS bundle.
// 	If you would like to create another JS bundle, simply add another JS file to the root of your JS folder.



// Here are just some examples on how to use the CommonJS modules.
// Feel free to roll your own logic.
var add 			= require( './src/examples/add' );
var value 			= require( './src/examples/value' );
var ExampleObject 	= require( './src/examples/object' );
var exampleModule 	= require( './src/examples/module' );


console.log( 'main.js initiated!' );
console.log( add( 2, 4 ) );
console.log( value );

var example1 		= new ExampleObject();
var example2 		= new ExampleObject( 'An amazing custom message!' );

example1.test();
example2.test();


exampleModule.init();
