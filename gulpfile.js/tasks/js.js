//@formatter:off

var requireCached               = require('../src/gulp/require-cached');
var config                      = require('../config');
var log                         = require('../src/debug/log');
var path                        = require('path');
var _                           = require('lodash');

var gulp                        = requireCached('gulp');
var webpack                     = requireCached('webpack');



function createOptions() {

    // @formatter:on
    // @see: http://webpack.github.io/docs/configuration.html
    var options = {

        webpack: {

            context: path.resolve(__dirname),

            bail: config.throwError,

            entry: config.source.getFilePaths( 'javascript', true ),

            output: {
                path: path.resolve(__dirname, '../../') + '/' +  config.dest.getPath( 'javascript' ),
                filename: "[name].js"
            },

            plugins: [],

            devtool: config.sourcemaps ? 'source-map' : undefined,

            module:{
                rules: [
                    // Javascript
                    {
                        enforce: 'pre',
                        test: /\.js?$/,
                        loader: 'eslint-loader',
                        exclude: /node_modules/
                    },
                    {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/
                    }
                ]
            }

        },

        uglify: {

            mangle: false,              // Pass false to skip mangling names.
            preserveComments: false     // 'all', 'some', {function}

        }

    };


    if( !options.webpack.entry.length ) log.error( {
        sender: 'js',
        message: 'No entry files found for JavaScript?! Check your source config...'
    } );


    // Convert entryfiles to valid webpack config object.
    if( options.webpack.entry.length ) {

        var webpackEntries = {};
        _.each( options.webpack.entry, function ( entryPath ) { webpackEntries[ path.parse( entryPath ).name ] = entryPath; } );
        options.webpack.entry = webpackEntries;
    }

    if( config.minify ) {

        options.webpack.plugins.push( new webpack.LoaderOptionsPlugin({ minimize: true }) );
        options.webpack.plugins.push( new webpack.optimize.UglifyJsPlugin( options.uglify ) );
        options.webpack.plugins.push( new webpack.NoEmitOnErrorsPlugin() );

    }

    return options;

}


function onWebpackCallback ( error, stats, opt_prevStats ) {

    if( error ) log.error( {
        sender: 'js',
        data: [ error ]
    } );

    if( config.verbose ) log.info( {
        sender: 'js',
        message: 'compiling...'
    } );

    console.log(stats.toString({ colors: true }));

}


gulp.task( 'js', function ( callback ) {

    webpack( createOptions().webpack, function ( error, stats ) {

        onWebpackCallback( error, stats );

        callback();

    } );

} );

module.exports = {

    createOptions: createOptions,
    onWebpackCallback: onWebpackCallback

}

