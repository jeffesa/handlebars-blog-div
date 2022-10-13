const gulp = require('gulp')
const css = require('./css')
const js = require('./js')
const markup = require('./markup')
const utils = require('./utils')

function watchCss () {
  return gulp.watch(`${css.paths.srcDir}**/*.scss`, [css.tasks.dev])
}

function watchJs () {
  return gulp.watch([
  `${js.paths.srcDir}**/*.js`,
  `${markup.paths.srcDir}**/*.hbs`
], [js.tasks.dev])
}

function watchMarkup () {
  return gulp.watch(`${markup.paths.srcDir}**/*.hbs`, [markup.tasks.dev])
}

gulp.task('watch', () => {
  utils.browserSync.init({
    server: {
      baseDir: './dist'
    },
    notify: false
  })

  watchCss()
  watchJs()
  watchMarkup()
})

gulp.task('watch:js', watchJs)
gulp.task('watch:css', watchCss)
gulp.task('watch:markup', watchMarkup)
