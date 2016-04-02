

// Here are just some examples on how to use the CommonJS modules.

// You use the require function with a string that represents
// a relative path from this file, to the file containing the script that you need ( require ).
// like so:
var add 			= require( './add' );
var value 			= require( './value' );
var ExampleObject 	= require( './object' );

// What you will receive from this require function depends on what is "exported" in the file that you require.
// It can be any valid JavaScript value such as: a number, string, Array, object or a function.
// save the returned value in a variable so you can use it in your script.

// here we call a function that we received with the require function.
console.log( add( 2, 4 ) );

// here we log a value that was received.
console.log( value );

// here we create new instances with a constructor that was received.
var example1 		= new ExampleObject();
var example2 		= new ExampleObject( 'An amazing custom message!' );

example1.test();
example2.test();


// When you inspect the files that have been required you will see:
// module.export = ...

// This assigns a value to return to whatever other file "requires" that current file.
// So you can assign anything you want.
// This makes it SUPER easy split up your logic into different files and make it more maintainable.


// NOTE: it is NOT required to pass anything onto the module.exports
// For example this file does not return anything.
// But when required by another file, this code will still be run.

// NOTE: this code will only be ran once. if you need to run something multiple times
// it would be better to export a function to call in the module.exports like so:
// module.exports = functionToCall;