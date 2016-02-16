var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var nodemon     = require('gulp-nodemon');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');

gulp.task('sass', function(){
  return gulp.src('public/assets/scss/*.scss')
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(concat('app.css'))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('public/assets/css'));
});

gulp.task('serve', function(){
  browserSync.init({
    proxy: 'localhost:8080'
  });
});

gulp.task('watch', function(){
  gulp.watch('public/views/*.html').on('change', browserSync.reload);
  gulp.watch('public/assets/css/*.css').on('change', browserSync.reload);
  gulp.watch('public/assets/scss/*.scss', ['sass']);
});

gulp.task('server', function(){
  nodemon({
    script: 'server.js',
    ext: 'js public/views/partials/*.html'
  }).on('restart', function(){
    setTimeout(browserSync.reload, 600);
  });

  setTimeout(function(){
    gulp.run('serve');
  }, 500);
});

gulp.task('default', ['server', 'watch']);
