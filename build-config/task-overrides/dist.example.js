const requireCached = require(`${process.env.PWD}/gulpfile.js/src/gulp/require-cached`)
const runSequence = require('run-sequence')

let config = require(process.env.PWD + '/gulpfile.js/config')
const gulp = requireCached('gulp')

gulp.task('dist', () => {
  config.debug = false
  config.minify = true
  config.sourcemaps = false
  config.prettyHTML = true

  config.dest.root.path = config.projectDirectory + '/build'
  config.dest.html.path = '<%= root %>/html'
  config.source.sw.path = config.dest.root.path + '/assets/'
  config.source.sw.strip = config.dest.root.path
  config.dest.manifest.path = config.dest.root.path
  config.dest.sw.path = config.dest.root.path

  // Overwrite config with project specific settings.
  config = Object.assign({}, config.projectConfig.config || {}, config)

  return gulp.series(
    'clean',
    gulp.parallel('copy', 'images', 'svg', 'inject-component-css'),
    gulp.parallel('css-lint', 'css'),
    gulp.parallel('html', 'libs', 'js'),
    gulp.parallel('sw'),
  )()
})
