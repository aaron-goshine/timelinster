'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var del = require('del');

var config = {};

gulp.task('styles', function () {
  return true;
});

gulp.task('scripts', function () {
  return true;
});

gulp.task('clean', function () {
  return true;
});

gulp.task('default', ['styles', 'scripts']);
