"use strict";

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/

// Import utilities.
import moduleInit from './src/modules/util/module-init';
import { initServiceWorker, removeServiceWorker } from './src/modules/util/sw'
import env from './src/system/environment'

// Import Singletons
import './src/modules/util/detect-touch';

// Import modules.
import ExampleModule from './src/modules/example';

if (!env.isLocal()) {
    initServiceWorker();
} else {
    removeServiceWorker();
}

// Initialize modules.
moduleInit( '[data-js-hook="js-module-example"]', ExampleModule );
