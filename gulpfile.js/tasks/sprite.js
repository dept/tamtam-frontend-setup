// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');
var log                     = require('../src/debug/log');

var path                    = require('path');
var changed                 = requireCached('gulp-changed');
var gulp                    = requireCached('gulp');
var svgmin                  = requireCached('gulp-svgmin');
var svg2png                 = requireCached('gulp-svg2png');
var glob                    = requireCached('glob');
var mkdirp                  = requireCached('mkdirp');
var gulpSvgSprite           = requireCached('gulpSvgSprite');
var mergeStream             = requireCached('merge-stream');
var svgmin                  = requireCached('gulp-svgmin');

// @formatter:on


/**
 * Task for optimizing svg images and making them available in the markup.
 * @see https://www.npmjs.com/package/gulp-svg-sprite
 * @see https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/
 */
gulp.task( 'sprite', function () {

    var options = {

        svgmin: {
            js2svg: {
                pretty: false // pretty printed svg
            },
            plugins: [
                { removeTitle: true },
                { removeComments: true }
            ]
        },

        svgSprite: {
            mode: {
                css: {
                    spacing: {
                        padding: 5
                    },
                    dest: './',
                    layout: 'diagonal',
                    sprite: 'sprite.svg',
                    bust: false,
                    render: {
                        scss: {
                            dest: path.relative( config.dest.getPath('svg'), config.source.getPath('assets', '/svg-sprite/_sprite.scss')),
                            template: config.source.getPath('assets',  '/svg-sprite/template.mustache')
                        }
                    }
                }
            }
        }

    };

    var pngStream;
    var svgStream;

    svgStream = gulp.src( config.source.getFileGlobs( 'svg' ) )

        .pipe( svgmin( options.svgmin ) )                       // Optimize SVG files
        .pipe( gulpSvgSprite( options.svgSprite ) )             // Create sprite and SASS template
        .on( 'error', log.error )
        .pipe( gulp.dest( config.dest.getPath( 'images' ) ) )
        .on( 'end', function  (  ) {

            pngStream = gulp.src( config.dest.getPath( 'images', options.svgSprite.mode.css.sprite ) )
                .pipe( svg2png() )                                      // Create png fallback
                .pipe( gulp.dest( config.dest.getPath( 'images' ) ) )      // Export
                .on( 'end', function  (  ) {

                    return mergeStream(svgStream, pngStream);

                });

        } );

} );
