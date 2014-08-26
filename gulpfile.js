var gulp = require('gulp');
var deploy = require('moz-deploy-b2g');
var reloadcss = require('moz-reloadcss-b2g');
var zip = require('gulp-zip');

var paths = {
  build: ['**/*.html', '**/*.properties', , '**/*.js'],
  css: '**/*.css',
};

gulp.task('watch', function() {
  gulp.watch(paths.build, ['deploy']);
  gulp.watch(paths.css, ['reloadcss']);
});

gulp.task('zip', function() {
  return gulp.src(['**/*', '!build/**/*', '!**/node_modules/**/*'])
    .pipe(zip('./build/app.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('deploy', ['zip'], function(cb) {
  deploy('./manifest.webapp', './build/app.zip', cb);
});

gulp.task('reloadcss', function(cb) {
  reloadcss('./manifest.webapp', cb).done();
});

gulp.task('default', ['watch','deploy']);