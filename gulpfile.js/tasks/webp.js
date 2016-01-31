// @formatter:off

var requireCachedModule     = require('../util/requireCachedModule');
var config                  = require('../config');

var changed                 = requireCachedModule('gulp-changed');
var gulp                    = requireCachedModule('gulp');
var webP                    = requireCachedModule('gulp-webp');

// @formatter:on

/**
 * Task for webp images.
 * @see https://github.com/imagemin/imagemin-webp
 */
gulp.task( 'webp', function () {

	var options = {

		config: {
			quality: 100,
			lossless: true
		}

	};

	return gulp.src( config.source.getFiles( 'images' ) )

		.pipe( changed( config.dest.getPath( 'images' ) ) )     // Ignore unchanged files
		.pipe( webP( options.config ) )                 				// Convert to webp
		.pipe( gulp.dest( config.dest.getPath( 'images' ) ) );  // Export

} );
