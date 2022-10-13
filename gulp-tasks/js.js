const gulp = require('gulp')
const browserify = require('browserify')
const uglify = require('gulp-uglify')
const vinylSourceStream = require('vinyl-source-stream')
const vinylBuffer = require('vinyl-buffer')
const utils = require('./utils')

const paths = {
  srcDir : 'src/js/',
  distDir : 'dist/js/',
  wpDir : '../src/wp-content/themes/maisdiversidade/js/',
  srcFile : 'index.js',
  distFile : 'app.js'
}

const compile = {
  dev : function () {
    return browserify({entries: `${paths.srcDir}${paths.srcFile}`, debug: true})
      .transform('babelify', {presets: ['@babel/preset-env']})
      .bundle()
      .pipe(vinylSourceStream(paths.distFile))
      .pipe(vinylBuffer())
      .pipe(gulp.dest(paths.distDir))
      .pipe(gulp.dest(paths.wpDir))
      .pipe(utils.browserSync.stream({match: '**/*.js'}))
  },

  dist : function () {
    return browserify({entries: `${paths.srcDir}${paths.srcFile}`, debug: true})
      .transform('babelify', {presets: ['@babel/preset-env']})
      .bundle()
      .pipe(vinylSourceStream(paths.distFile))
      .pipe(vinylBuffer())
      .pipe(uglify())
      .pipe(gulp.dest(paths.distDir))
      .pipe(gulp.dest(paths.wpDir))
      .pipe(utils.browserSync.stream({match: '**/*.js'}))
    }
}

const tasks = {
  dev : 'js:dev',
  dist : 'js:dist'
}

gulp.task(tasks.dev, compile.dev)
gulp.task(tasks.dist, compile.dist)

module.exports = {
  tasks : tasks,
  compile : compile,
  paths : paths
}
