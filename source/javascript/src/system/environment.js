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
class Environment {

	// @formatter:off

    constructor() {
        this._environment = null;
        this._environments = {};
    }

	/**
	 * Function to set the local host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	setLocal( hostname ) { this.set( ENVIRONMENT_LOCAL, hostname ); }

	/**
	 * Function to set the test host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	setTest ( hostname ) { this.set( ENVIRONMENT_TEST, hostname ); }

	/**
	 * Function to set the acceptation host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	setAcceptation ( hostname ) { this.set( ENVIRONMENT_ACCEPTATION, hostname ); }

	/**
	 * Function to set the production host name(s)
	 * @param hostname {string|Array} a single hostname or Array with multiple hostnames.
	 */
	setProduction ( hostname ) { this.set( ENVIRONMENT_PRODUCTION, hostname ); }

	// @formatter:on


	set ( name, hostname ) {

		if( !Array.isArray( hostname ) ) {

			this._environments[ hostname ] = name;

		} else {

			for ( let i = 0, leni = hostname.length; i < leni; i++ ) {
				this._environments[ hostname[ i ] ] = name;
			}

		}

	}

	get() {

		if( this._environment !== null ) {
			return this._environment;
		}

        for ( const hostname in this._environments ) {

            if( location.hostname === hostname ) {

                this._environment = this._environments[ hostname ];

                break;

            }

        }

        return this._environment;

	}

	isLocal() { return this.get() === ENVIRONMENT_LOCAL; }

    isTest() { return this.get() === ENVIRONMENT_TEST; }

    isAcceptation() { return this.get() === ENVIRONMENT_ACCEPTATION; }

    isProduction() { return this.get() === ENVIRONMENT_PRODUCTION; }

}

const environment = new Environment();

// pre-fill localhost settings
environment.setLocal( [ 'localhost', '0.0.0.0' ] );

// Returns the object and not a constructor, because there should be only a single instance of this type.
export default environment;
