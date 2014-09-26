'use strict';

var deploy = require('fxos-deploy/command');
var reloadcss = require('fxos-reloadcss/command');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    zip: {
      main: {
        options: {
          archive: 'build/app.zip'
        },
        expand: true,
        src: ['**/*'],
        cwd: 'src/'
      }
    },
    watch: {
      files: ['src/**/*'],
      tasks: ['deploy', 'reloadcss']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.task.renameTask('compress', 'zip');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('deployto', 'Deploy', function () {
    var done = this.async();
    deploy({
      exit: true,
      manifestURL: './src/manifest.webapp',
      zip: './build/app.zip'
    }, null, function (err) {
      if (!err) console.log('Deploy successful');
      done(err);
    })
  });

  grunt.registerTask('reloadcss', 'Reload CSS', function () {
    var done = this.async();
    reloadcss({
      manifestURL: './src/manifest.webapp',
      exit: true
    }, null, function(err) {
      if (!err) console.log('Reload successful');
      done(err);
    });
  });

  grunt.registerTask('deploy', ['zip', 'deployto']);
  grunt.registerTask('default', ['deploy', 'watch']);

};