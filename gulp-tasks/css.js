const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const purgecss = require('gulp-purgecss')
const cssnano = require('cssnano')
const utils = require('./utils')

const paths = {
  srcDir : 'src/scss/',
  distDir : 'dist/css/',
  wpDir : '../src/wp-content/themes/maisdiversidade/css/',
  srcFile : 'pages/*.scss',
  distFile : ''
}

const sassDevOptions = {
  outputStyle : 'expanded',
  precision : 10,
  sourceMap : true
}

const sassDistOptions = {
  outputStyle : 'compressed',
  precision : 10,
  sourceMap : false
}

const postcssDevProcessors = [autoprefixer({browsers: ['ios >= 9']})]

const postcssDistProcessors = [
  autoprefixer({browsers: ['ios >= 9']}),
  cssnano()
]

const compile = {
  dev : function () {
    return gulp.src(`${paths.srcDir}${paths.srcFile}`)
      .pipe(sass(sassDevOptions).on('error', sass.logError))
      .pipe(postcss(postcssDevProcessors))
      .pipe(gulp.dest(paths.distDir))
      .pipe(gulp.dest(paths.wpDir))
      .pipe(utils.browserSync.stream({match: '**/*.css'}))
  },

  dist : function () {
    return gulp.src(`${paths.srcDir}${paths.srcFile}`)
      .pipe(sass(sassDistOptions).on('error', sass.logError))
      .pipe(postcss(postcssDistProcessors))
      .pipe(purgecss({
        content: ['dist/**/*.html'],
        whitelistPatterns: [
          /flickity\-/,
          /modal\-/,
          /is\-n\-/,
          /has\-text\-/,
          /has\-background\-/,
          /dot/, 
          /is\-selected/,
          /openMobile/
        ]
      }))
      .pipe(gulp.dest(paths.distDir))
      .pipe(gulp.dest(paths.wpDir))
      .pipe(utils.browserSync.stream({match: '**/*.css'}))
  }
}

const tasks = {
  dev : 'css:dev',
  dist : 'css:dist'
}

gulp.task(tasks.dev, compile.dev)
gulp.task(tasks.dist, compile.dist)

module.exports = {
  tasks : tasks,
  compile : compile,
  paths : paths
}
