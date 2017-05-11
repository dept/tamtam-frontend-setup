'use strict';
module.exports = 
    {
        "env": {
            "browser": true,
            "commonjs": true,
            "es6": false,
            "jquery": true
        },
        "extends": "eslint:recommended",
        "parserOptions": {
            "sourceType": "module"
        },
        "globals": {
            "dataLayer": true
        },
        "rules": {
            "no-console": "off"
        }
    }