'use strict';

module.exports = function ( $q ) {

	return {

		responseError: function exampleInterceptorResponseError ( rejection ) {

			if( rejection.status === 401 ) {
				// Do something example: Emit event
			}
			// Default. Will end up on the '$routeChangeError' event or the promise fail handler.
			return $q.reject( rejection );

		}

	}

}