'use strict';

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import 'babel-polyfill';
import './src/config';

// Import utilities.
import moduleInit from './src/util/module-init';

// Import Singletons
import './src/util/detect-touch';

// Import modules.
import ExampleModule from './src/example';

// Initialize modules.
moduleInit( '[js-hook-module-example]', ExampleModule );
