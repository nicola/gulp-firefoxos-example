var gulp = require('gulp');
var deploy = require('fxos-deploy');
var reloadcss = require('fxos-reloadcss');
var zip = require('gulp-zip');
var simulator = require('fxos-connect')({connect:true});

var paths = {
  build: ['./*.html', 'data/*.properties', 'js/*.js', '!**/node_modules/**/*'],
  css: ['css/*.css'],
};

gulp.task('zip', function() {
  return gulp.src(['**/*', '!build/**/*', '!**/node_modules/**/*'])
    .pipe(zip('./build/app.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('deploy', ['zip'], function(cb) {
  deploy('./manifest.webapp', './build/app.zip', cb).done();
});

gulp.task('reloadcss', function(cb) {
  reloadcss('./manifest.webapp', cb).done();
});

gulp.task('watch', function() {
  gulp.watch(paths.build, ['deploy']);
  gulp.watch(paths.css, ['reloadcss']);
});

gulp.task('default', ['watch', 'deploy']);