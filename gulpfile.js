'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/karma_tests/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/karma_tests/'));
});

gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('karmatest', ['webpack:test'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('default', ['karmatest', 'build']);

// var jshint = require('gulp-jshint');
// var stylish = require('jshint-stylish');
// var webpack = require('gulp-webpack');
// var KarmaServer = require('karma').Server;
//
// gulp.task('mochatest', function() {
//   return gulp.src('test/mocha-tests/*.js')
//              .pipe(mocha())
//              .pipe(exit());
//  });
//
// gulp.task('karmatest', ['webpack:test'], function(done) {
//   new KarmaServer({
//     configFile: __dirname + '/karma.conf.js'
//   }, done).start();
// });
//
// gulp.task('lint', function() {
//   return gulp.src(['app/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', './gulpfile.js'])
//              .pipe(jshint.reporter(stylish));
//  });
//
// gulp.task('webpack:make', function() {
//  return gulp.src('app/js/client.js')
//             .pipe(webpack({
//             .pipe(gulp.dest('build/'));
//  });
//
// gulp.task('webpack:test', function() {
//   return gulp.src('test/karma-tests/entry.js')
//              .pipe(webpack({
//                output: {
//                filename: 'test-bundle.js'
//       }
//     }))
//              .pipe(gulp.dest('test/karma-tests/'));
// });
//
// gulp.task('copy', function() {
//    return gulp.src('app/**/*.html')
//               .pipe(gulp.dest('build/'));
//  });
//
//  gulp.task('watch:lint', function() {
//    gulp.watch(['app/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', './gulpfile.js'], ['lint']);
//  });
//
//  gulp.task('watch:build', function() {
//    gulp.watch(['./app/**/*'], ['build']);
//  });
//
// gulp.task('testall', ['mochatest', 'karmatest']);
// gulp.task('build', ['webpack:make', 'copy']);
// gulp.task('default', ['karmatest', 'build']);
