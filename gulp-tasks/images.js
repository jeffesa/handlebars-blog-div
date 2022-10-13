const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const utils = require('./utils')

const paths = {
  srcDir : 'src/img/',
  distDir : 'dist/img/'
}

const compile = {
  dev : function () {
    return gulp.src(`${paths.srcDir}**/*.*`)
      .pipe(gulp.dest(`${paths.distDir}`))
      .pipe(utils.browserSync.stream())
  },
  dist : function () {
    return gulp.src(`${paths.srcDir}**/*.*`)
      .pipe(imagemin())
      .pipe(gulp.dest(`${paths.distDir}`))
      .pipe(utils.browserSync.stream())
  }
}

const tasks = {
  dev : 'images:dev',
  dist : 'images:dist'
}

gulp.task(tasks.dev, compile.dev)
gulp.task(tasks.dist, compile.dist)

module.exports = {
  tasks : tasks,
  compile : compile,
  paths : paths
}
