var gulp = require('gulp');
var deploy = require('fxos-deploy/command');
var reloadcss = require('fxos-reloadcss/command');
var zip = require('gulp-zip');
var connect = require('fxos-connect');

var paths = {
  build: ['src/**/*', '!src/css/*.css'],
  css: ['src/css/*.css'],
};

gulp.task('zip', function() {
  return gulp.src(['src/**/*'])
    .pipe(zip('./build/app.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('deploy_2.2', ['zip'], function(cb) {
  deploy({
    exit: true,
    manifestURL:'./src/manifest.webapp',
    zip:'./build/app.zip',
    release: ['2.2']
  }, null, cb);
});

gulp.task('deploy_2.1', ['zip'], function(cb) {
  deploy({
    exit: true,
    manifestURL:'./src/manifest.webapp',
    zip:'./build/app.zip',
    release: ['2.1']
  }, null, cb);
});

gulp.task('deploy_2.0', ['zip'], function(cb) {
  deploy({
    exit: true,
    manifestURL:'./src/manifest.webapp',
    zip:'./build/app.zip',
    release: ['2.0']
  }, null, cb);
});

gulp.task('reloadcss', function(cb) {
  reloadcss({
    manifestURL:'./src/manifest.webapp',
    exit:true
  }, null, cb);
});

gulp.task('deploy', ['deploy_2.0']);

gulp.task('watch', function() {
  gulp.watch(paths.build, ['deploy']);
  gulp.watch(paths.css, ['reloadcss']);
});

gulp.task('watch_all', function() {
  gulp.watch(paths.build, ['deploy_all']);
});

gulp.task('default', ['deploy', 'watch']);
gulp.task('deploy_all', ['deploy_2.0','deploy_2.1', 'deploy_2.2'])
gulp.task('all', ['deploy_all', 'watch_all']);