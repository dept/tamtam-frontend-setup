'use strict';

module.exports = function () {

	return function ( text, length ) {

		if( text && text.length >= length - 3 ) {

			text = text.substr( 0, length - 3 ) + '...';

		}

		return text;

	}

}