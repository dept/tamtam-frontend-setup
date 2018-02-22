'use strict';

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/

// Import utilities.
import env from './src/system/environment';
import moduleInit from 'utilities/module-init';
import { initServiceWorker, removeServiceWorker } from 'utilities/sw';

// Import Singletons
import 'utilities/detect-touch';

// Import modules.
import ExampleModule from 'components/example';

if (!env.isLocal()) {
    initServiceWorker();
} else {
    removeServiceWorker();
}

// Initialize modules.
moduleInit( '[js-hook-module-example]', ExampleModule );
