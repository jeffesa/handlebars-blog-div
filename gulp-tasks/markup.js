const gulp = require('gulp')
const hb = require('gulp-hb')
const hbLayouts = require('handlebars-layouts')
const rename = require('gulp-rename')
const utils = require('./utils')

const paths = {
  srcDir : 'src/hbs/',
  distDir : 'dist/',
  srcFile : 'templates/pages/*.hbs'
}

function compileTemplates () {
  
  // Commented code are examples of what is available to be used.
  const hbStream = hb({debug: true})
        // Partials
        .partials(`${paths.srcDir}partials/**/*.hbs`)
        .partials(`${paths.srcDir}components/**/*.hbs`)
        .partials(`${paths.srcDir}templates/layouts/**/*.hbs`)
 
        // Helpers
        .helpers(`${paths.srcDir}helpers/*.js`)
        .helpers(hbLayouts)
        // .helpers({
        //     foo: function () { ... },
        //     bar: function () { ... }
        // })
 
        // Decorators
        // .decorators('./decorators/**/*.js')
        // .decorators({
        //     baz: function () { ... },
        //     qux: function () { ... }
        // })
 
        // Data
        // .data('./data/**/*.{js,json}')
        // .data({
        //     lorem: 'dolor',
        //     ipsum: 'sit amet'
        // });

  return gulp.src(`${paths.srcDir}${paths.srcFile}`)
    .pipe(hbStream)
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(`${paths.distDir}`))
    .pipe(utils.browserSync.stream())
}

const compile = {
  dev : compileTemplates,
  dist : compileTemplates
}

const tasks = {
  dev : 'markup:dev',
  dist : 'markup:dist'
}

gulp.task(tasks.dev, compile.dev)
gulp.task(tasks.dist, compile.dist)

module.exports = {
  tasks : tasks,
  compile : compile,
  paths : paths
}
