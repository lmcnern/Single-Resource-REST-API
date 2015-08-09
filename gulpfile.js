'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');

gulp.task('build', ['webpack', 'copy']);
gulp.task('default', ['msg', 'test', 'stylish lint'], function() {

});

gulp.task('msg', function() {
  return gutil.log('======Starting Gulp!======');
});

gulp.task('webpack', function() {
  return gulp.src('app/js/client.js')
          .pipe(webpack({
               output: {
                 filename: 'bundle.js'
               }
             }))
             .pipe(gulp.dest('build/'));
});

gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
             .pipe(gulp.dest('build/'));
});

gulp.task('test', function() {
  return gulp.src('test/*test.js')
             .pipe(mocha({reporter: 'progress'}));
});

gulp.task('stylish lint', function() {
  return gulp.src('*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});
