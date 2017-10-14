//@formatter:off

var requireCached = require('../src/gulp/require-cached');
var config = require('../config');
var log = require('../src/debug/log');
var path = require('path');
var _ = require('lodash');

var gulp = requireCached('gulp');
var webpack = requireCached('webpack');
var BabelMinifyWebpackPlugin = requireCached('babel-minify-webpack-plugin');


const configurePlugins = (opts = {}) => {

    const plugins = [];

    if (config.minify) {

        plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
        plugins.push(new webpack.NoEmitOnErrorsPlugin());
        plugins.push(new BabelMinifyWebpackPlugin());

    }

    return plugins;
};

const configureBabelLoader = (browserlist) => {
    return {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['env', {
                        modules: false,
                        useBuiltIns: true,
                        targets: {
                            browsers: browserlist,
                        },
                    }],
                ],
            },
        },
    };
};

const esLintConfig = {
    enforce: 'pre',
    test: /\.js?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
}

const baseConfig = {
    context: path.resolve(__dirname),
    bail: config.throwError,
    output: {
        path: path.resolve(__dirname, '../../') + '/' + config.dest.getPath('javascript'),
        filename: '[name].js',
    },
    cache: {},
    devtool: config.sourcemaps ? 'source-map' : undefined,
};

const modernConfig = Object.assign({}, baseConfig, {
    entry: {
        'main': path.resolve(__dirname, '../../source/javascript', 'main.js')
    },
    plugins: configurePlugins({ runtimeName: 'runtime' }),
    module: {
        rules: [
            esLintConfig,
            configureBabelLoader(config.browsers.modern),
        ],
    },
});

const legacyConfig = Object.assign({}, baseConfig, {
    entry: {
        'main-legacy': path.resolve(__dirname, '../../source/javascript', 'main-legacy.js')
    },
    plugins: configurePlugins({ runtimeName: 'runtime-legacy' }),
    module: {
        rules: [
            esLintConfig,
            configureBabelLoader(config.browsers.legacy),
        ],
    },
});

const createCompiler = (config) => {
    const compiler = webpack(config);
    return () => {
        return new Promise((resolve, reject) => {
            compiler.run((error, stats) => {

                onWebpackCallback(error, stats);

                resolve();

            });
        });
    };
};

const onWebpackCallback = (error, stats, opt_prevStats) => {

    if (stats.stats) {

        stats.stats.forEach(stat => {
            logStats(stat);
        });

    } else {

        logStats(stats);

    }

    if (error) log.error({
        sender: 'js',
        data: [error]
    });

    if (config.verbose) log.info({
        sender: 'js',
        message: 'compiling...'
    });


}

function logStats(stats) {

    console.log(`\n ${stats.toString({ colors: true })} \n`);

}

gulp.task('js', function (callback) {

    const compileBundle = createCompiler([legacyConfig, modernConfig]);

    compileBundle()
        .then(() => callback());

});

module.exports = {
    onWebpackCallback: onWebpackCallback,
    config: [legacyConfig, modernConfig]
}
