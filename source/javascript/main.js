"use strict";

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/

// Import utilities.
import moduleInit from './src/modules/util/module-init';


// Import modules.
import ExampleModule from './src/modules/example';


// Initialize modules.
moduleInit( '[data-js-hook="js-module-example"]', ExampleModule );
