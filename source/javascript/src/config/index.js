/**
 * Configure all the singleton modules in this file.
 * That way the main.js stays clean :)
 *
 * Feel free to create folders inside this directory and import the configs here.
 */

import Environment from '../system/environment';
import { initServiceWorker, removeServiceWorker } from '../modules/util/sw';


// Environment
Environment.setTest([
    'www.project-x.test.tamtam.nl',
    'project-x.test.tamtam.nl'
]);
// ----


// Service workers
if (!Environment.isLocal()) {
    initServiceWorker();
} else {
    removeServiceWorker();
}
// ----
