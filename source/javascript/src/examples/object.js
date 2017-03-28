
// Note that this variable will be only accessible within this file
// and that it's value will remain the same for all ExampleClass instances created.
var notGlobal = 'This variable is not global because this file is wrapped into its own scope by browserify.';


/**
 * Small example on how to define a 'class' like object.
 * @constructor
 * @param opt_message {string=} an optional message
 */
function ExampleObject ( opt_message ) {

    // a private variable, ONLY accessible from within this object.
    var _message = opt_message || 'This is a default message...'


    // a public function, can be called upon any instance of this object.
    this.test = function () {

        console.log( lowercase( _message ) );

    }

    // a private function, can ONLY be called from within this object.
    function lowercase ( string ) {

        return string.toLocaleLowerCase();

    }

}


/**
 * Assign the value any other file will receive when they 'require' this file.
 * In this case the constructor of this ExampleObject
 * This way other files can create new instances of this class using the 'new' keyword:
 * e.g.:
 * 		var ExampleObject 	= require('./ExampleObject');
 *
 *      var someInstance 	= new ExampleObject( 'custom message' );
 */
export default ExampleObject;
