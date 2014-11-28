module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsonpretty: {
      cwd:'content/',
      options: {
        indent: 4,
        minify: false
      },
    }
  });
  grunt.loadNpmTasks('grunt-jsonpretty');
  grunt.registerTask('default',['jsonpretty']);
};