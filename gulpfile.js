'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', ['msg', 'test', 'stylish lint'], function() {

});

gulp.task('msg', function() {
  return gutil.log('======Starting Gulp!======');
});

gulp.task('test', function() {
  return gulp.src('test/*test.js')
             .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('stylish lint', function() {
  return gulp.src('*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});
