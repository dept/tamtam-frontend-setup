"use strict";

// @formatter:off

const ENVIRONMENT_LOCAL 		= 'local';
const ENVIRONMENT_TEST 			= 'test';
const ENVIRONMENT_ACCEPTATION 	= 'acceptation';
const ENVIRONMENT_PRODUCTION 	= 'production';

// @formatter:on


/**
 * Simple Object to check in which environment we are on based on the hostname
 * @constructor
 */
function Environment () {

	// @formatter:off

	let _environment;
	let _environments = {};

	/**
	 * Function to set the local host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	this.setLocal 		= ( hostname ) => { set( ENVIRONMENT_LOCAL, 	    hostname ) };

	/**
	 * Function to set the test host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	this.setTest 		= ( hostname ) => { set( ENVIRONMENT_TEST, 		    hostname ) };

	/**
	 * Function to set the acceptation host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	this.setAcceptation = ( hostname ) => { set( ENVIRONMENT_ACCEPTATION,   hostname ) };

	/**
	 * Function to set the production host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	this.setProduction 	= ( hostname ) => { set( ENVIRONMENT_PRODUCTION, 	hostname ) };

	// @formatter:on


	function set ( name, hostname ) {

		if( !Array.isArray( hostname ) ) {

			_environments[ hostname ] = name;

		} else {

			for ( let i = 0, leni = hostname.length; i < leni; i++ ) {
				_environments[ hostname[ i ] ] = name;
			}

		}

	}

	this.get = function get () {

		if( _environment !== undefined ) return _environment;

		for ( let hostname in _environments ) {

			if( location.hostname === hostname ) {

				_environment = _environments[ hostname ];

				break;

			}

		}

		return _environment;

	};

	/**
	 * Returns whether the current environment is local
	 * @returns {boolean}
	 */
	Object.defineProperty( this, 'isLocal', {
		enumerable: true,
		get: () => { return this.get() === ENVIRONMENT_LOCAL; }
	} );

	/**
	 * Returns whether the current environment is test
	 * @returns {boolean}
	 */
	Object.defineProperty( this, 'isTest', {
		enumerable: true,
		get: () => { return this.get() === ENVIRONMENT_TEST; }
	} );

	/**
	 * Returns whether the current environment is acceptation
	 * @returns {boolean}
	 */
	Object.defineProperty( this, 'isAcceptation', {
		enumerable: true,
		get: () => { return this.get() === ENVIRONMENT_ACCEPTATION }
	} );

	/**
	 * Returns whether the current environment is production
	 * @returns {boolean}
	 */
	Object.defineProperty( this, 'isProduction', {
		enumerable: true,
		get: () => { return this.get() === ENVIRONMENT_PRODUCTION; }
	} );

}

let environment = new Environment();

// pre-fill localhost settings
environment.setLocal( [ 'localhost', '0.0.0.0' ] );

// Returns the object and not a constructor, because there should be only a single instance of this type.
export default environment;
