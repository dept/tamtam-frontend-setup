const requireCached = require(`tamtam-frontend-builder/gulpfile.js/src/gulp/require-cached`)

const gulp = requireCached('gulp')

gulp.task('css', () => {
  console.log('This is an example task.')
})
