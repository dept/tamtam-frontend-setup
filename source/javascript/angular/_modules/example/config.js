'use strict';
// @formatter:off


// @formatter:on

// configFunction to register work which needs to be done on module load.
// As with the module itself dependencies can be injected.
module.exports = function _moduleConfig ( $interpolateProvider ) {

	// apply configuration here

    // Change the variable symbol for AngularJS so it does not conflict with the Nunjucks templates.
    $interpolateProvider.startSymbol('<%').endSymbol('%>');

}



