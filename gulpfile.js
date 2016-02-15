var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var nodemon     = require('gulp-nodemon');
var runSequence = require('run-sequence');

gulp.task('serve', function(){
  browserSync.init({
    proxy: "localhost:8080"
  });
  gulp.watch("public/views/**/*.html").on('change', browserSync.reload);
});

// gulp.task('server', function(){
//   nodemon({
//     script: 'server.js'
//   });
// });

gulp.task('default', ['serve']);
