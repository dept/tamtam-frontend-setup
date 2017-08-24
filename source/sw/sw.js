'use strict';

console.log('Service Worker: executing.', self.location.hostname.indexOf('localhost'));

self.importScripts('sw-toolbox.js');

const _ISLOCAL = self.location.hostname.indexOf('localhost') !== -1;

var config = {

    production: {
        version: 'v1-frontend-setup',
        staticCacheItems: [
            '/offline',
            '/assets/css/main.css',
            '/assets/js/main.js'
        ],
        offlinePage: '/offline'
    },

    local: {
        staticCacheItems: [
            '/offline.html',
            '/assets/css/main.css',
            '/assets/js/main.js'
        ],
        offlinePage: '/offline.html'
    }

};

var usedConfig = (_ISLOCAL) ? config.local : config.production; 
var OFFLINE_URL = usedConfig.offlinePage;

self.toolbox.options.cache.maxAgeSeconds = 60 * 60 * 24;
self.toolbox.options.cache.maxEntries = 20;

if (!_ISLOCAL) {

    self.toolbox.precache(usedConfig.staticCacheItems);

    self.toolbox.router.get('/(.*)', function (req, vals, opts) {

        return toolbox.networkFirst(req, vals, opts)

            .catch(function (error) {

                if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
                    return toolbox.cacheOnly(new Request(OFFLINE_URL), vals, opts);
                }

                throw error;

            });

    });

}