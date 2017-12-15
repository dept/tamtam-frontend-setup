'use strict';

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import 'babel-polyfill';

// Import utilities.
import env from './src/system/environment';
import moduleInit from './src/modules/util/module-init';
import { initServiceWorker, removeServiceWorker } from './src/modules/util/sw';

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
moduleInit( '[js-hook-module-example]', ExampleModule );
