var gulp = require('gulp');
var deploy = require('fxos-deploy/command');
var reloadcss = require('fxos-reloadcss');
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

gulp.task('deploy', ['zip'], function(cb) {
  deploy({
    exit: true,
    manifestURL:'./src/manifest.webapp',
    zip:'./build/app.zip'
  }, cb)
});

gulp.task('reloadcss', function(cb) {
  connect({exit:true, connect:true}).then(function(sim) {
    return reloadcss({manifestURL:'./src/manifest.webapp', client:sim.client}).then(function() {
      sim.client.disconnect();
    });
  }).done(cb);
});

gulp.task('watch', function() {
  gulp.watch(paths.build, ['deploy']);
  gulp.watch(paths.css, ['reloadcss']);
});

gulp.task('default', ['deploy', 'watch']);