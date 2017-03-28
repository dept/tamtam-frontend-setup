
// Here are just some examples on how to use imports in ES6.

// You use import with a string that represents
// a relative path from this file, to the file containing the script that you need
// like so:

// If you put method names in curly brackets, you import specific functions/vars/objects.
// You can also import anything with a different name, like 'subtract as subtractCalc'.
import {add, subtract as subtractCalc} from './calculations';
// If you omit the brackets, you can only require 1 exported thing, the default exported. The name you give it
// Doesn't need to be the name the function/var/object has in the required file.
import value from './value' ;
import ExampleObject from './object';

// What you will receive from this require function depends on what is "exported" in the file that you require.
// It can be any valid JavaScript value such as: a number, string, Array, object or a function.
// save the returned value in a variable so you can use it in your script.

// here we call a function that we received with the require function.
console.log( add( 2, 4 ) );

console.log(subtractCalc(2, 4) );

// here we log a value that was received.
console.log( value );

// here we create new instances with a constructor that was received.
let example1 		= new ExampleObject();
let example2 		= new ExampleObject( 'An amazing custom message!' );

example1.test();
example2.test();


// When you inspect the files that have been required you will see:
// export or export default...
