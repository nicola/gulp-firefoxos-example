'use strict';

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
    var deploy = require('fxos-deploy/command');
    deploy({
      exit: true,
      manifestURL: './src/manifest.webapp',
      zip: './build/app.zip'
    }, null, function () {
      console.log('Deploy successful');
    });
  });

  grunt.registerTask('reloadcss', 'Reload CSS', function () {
    var reloadcss = require('fxos-reloadcss/command');
    reloadcss({
      manifestURL: './src/manifest.webapp',
      exit: true
    }, null);
  });

  grunt.registerTask('deploy', ['zip', 'deployto']);
  grunt.registerTask('default', ['deploy', 'watch']);

};