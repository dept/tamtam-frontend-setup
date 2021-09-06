'use strict'

/*------------------------------------*\
 * JS Main entry file
\*------------------------------------*/
import './config'
import '@/utilities/detect-touch'
import '@/utilities/detect-keyboard-focus'
import '@/components/image'

// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync
import moduleInit from '@/utilities/module-init'
moduleInit.async('[js-hook-module-example]', () => import('@/components/example'))
