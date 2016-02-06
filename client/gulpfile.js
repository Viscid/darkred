'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')

  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'))
  .pipe(livereload());
});

gulp.task('sass:watch', function() {
  livereload.listen();
  gulp.watch('./sass/**/*.scss', ['sass']);
})
