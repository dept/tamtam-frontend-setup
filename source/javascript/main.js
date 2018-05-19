'use strict';

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config';

// Import utilities.
import moduleInit from '@utilities/module-init';

// Import Singletons
import '@utilities/detect-touch';

// Import modules.
import Example from '@components/example';

// Initialize modules.

// Sync
moduleInit.sync('[js-hook-module-example]', Example);

// Async
// moduleInit.async('[js-hook-module-example]', () => import('@components/example'));
