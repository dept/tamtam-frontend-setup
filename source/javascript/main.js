'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
// import Example from '@components/example';
// Initialize modules.
// Sync
import '@utilities/detect-keyboard-focus'
// Import utilities.
// Import modules.
import '@utilities/detect-touch'

// Import Singletons
import moduleInit from '@utilities/module-init'
// moduleInit.sync('[js-hook-module-example]', Example);

// Async
moduleInit.async('[js-hook-module-example]', () => import('@components/example'))
