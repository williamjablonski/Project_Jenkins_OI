const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')
var browserSync = require('browser-sync').create();

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  })
})

gulp.task('default', () => {
  if (util.env.production) {
    sequence('deps', 'app')
  } else {
    sequence('deps', 'app', 'server')
  }
})
