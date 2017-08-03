// @formatter:off

var config                      = require('./config');
var runSequence					= require( 'run-sequence' );
var init                      	= require('./src/gulp/init');


config.applyProcessArgs();


// Define asset files here that need to be copied straight to the build folder.
// SVG and image files will be optimized and pushed to the build folder automatically, do not define those here.
config.copy = function () {

    return [
        {   source: config.source.getPath('assets', '*.*'),             dest: config.dest.getPath('assets')  },
        {   source: config.source.getPath('assets', 'fonts/**'),        dest: config.dest.getPath('fonts')  }
    ];

};

// Libraries that will be concatenated into libs.js together on the global scope, used for commonJS incompatible libs & plugins
// You can user bower or npm getPath by default
// @example: config.source.getPath('npm', 'jquery/dist/jquery.js' )
// @note: You need to include /js/libs.js in order to use these libs in your project.
//

config.libs = function () {

    return [
        //config.source.getPath('npm', 'jquery/dist/jquery.js' ),
        //config.source.getPath('bower', 'jquery.cookie/jquery.cookie.js' )
    ];

};




//--------------     M A I N   T A S K S    L I S T     --------------


function registerMainTasks( gulp ){


    // Specifies the default set of tasks to run when you run `gulp`.
    gulp.task( 'default', [ 'server' ] );


    /**
     *  @task server
     *  Build the project.
     *  Fires up a local server.
     *  Starts watching all the used files and rebuilds on file changes.
     *  - This will also automatically refresh your browser after something has been rebuild.
     */
    gulp.task( 'server', function ( callback ) {

        runSequence(
            'build',
            'browser-sync',
            'watch',
            callback
        );

    } );


     /**
     *  @task build
     *  Deletes the old files and builds the project from scratch.
     */
    gulp.task( 'build', function ( callback ) {

        if(config.debug) config.optimizeImages = false;
        if(config.debug) config.convertWebp    = false;

        runSequence(
            'clean',
            [ 'copy', 'images', 'webp', 'svg' ],
            [ 'html', 'libs', 'js', 'css-lint', 'css' ],
            callback
        );

    } );


    /**
     * @task build:dist
     * Builds the project in distribution mode pushes the files to the backend folder
     */
    gulp.task( 'dist', function ( callback ) {

        config.debug            = false;
        config.minify           = true;
        config.sourcemaps       = false;
        config.prettyHTML       = true;

        config.dest.root.path   = '../backend';

        runSequence(
            'build',
            callback
        );

    } );


     /**
     * @task build:bamboo
     * Builds the project for bamboo.
     */
    gulp.task( 'bamboo', function ( callback ) {

        config.debug                = false;
        config.sourcemaps           = false;
        config.throwError           = true;
        config.minify               = true;
        config.prettyHTML           = false;

        config.dest.html.path     	= '<%= root %>/html';

        runSequence(
            'clean',
            [ 'copy', 'images', 'webp', 'svg' ],
            [ 'html', 'libs', 'js', 'css' ],
            callback
        );

    } );

}


// Run initialisation
init( registerMainTasks );
