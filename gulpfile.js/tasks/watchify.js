// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var browserifyTask          = require('./browserify');

var gulp                    = requireCached('gulp');

// @formatter:on


gulp.task('watchify', function() {

    // Start browserify task with watchify === true
    return browserifyTask(true);

});