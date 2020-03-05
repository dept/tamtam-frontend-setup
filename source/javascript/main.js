'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'
import '@utilities/detect-visibility'

import moduleInit from '@utilities/module-init'
// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync

moduleInit.async('[js-hook-animated-section]', () => import('@components/section'))

moduleInit.async('[js-hook-module-example]', () => import('@components/example')) // Async
