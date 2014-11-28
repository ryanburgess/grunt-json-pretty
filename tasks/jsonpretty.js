/*
 * grunt-json-pretty
 * https://github.com/ryanburgess/grunt-json-pretty
 *
 * Copyright (c) 2014 Ryan Burgess
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.registerTask('json-pretty', function(){
    var fs = require('fs'),
      options,
      fileContent,
      fileFull,
      content,
      minFile,
      minContent,
      minFileContent,
      indent,
      successful = 0,
      failed = 0;

    options = this.options({
      indent: 2,
      files: '/content/',
      minify: null
    });

    // Get list of files depending on the file directory
    grunt.file.expand({
      filter: 'isFile',
        cwd: options.files // Change this reference to your directory
      }, 
      ['**/*']).forEach(function(file){

        try {
          fileFull = options.files + file;
          fileContent = fs.readFileSync(fileFull);
          content = JSON.parse(fileContent);
          successful++;

          //Serialize as JSON and Write it to a file
          fs.writeFileSync(fileFull, JSON.stringify(content, null, options.indent));
          if(options.minify !== null){
        
            if(fileFull.indexOf('.min.json') > -1){
              minContent = fs.readFileSync(minFile);
            }else{
              minFile = fileFull.replace('.json', '.min.json');
              minContent = fs.readFileSync(fileFull);
            }
            minFileContent = JSON.parse(minContent);
            fs.writeFileSync(minFile, JSON.stringify(minFileContent));
          }
        }catch (e) {
          failed++;
          grunt.log.error('File "' + file + '" failed JSON pretty.');
          grunt.fail.warn(e);
        }
    });
    // output files updated
    grunt.log.ok(successful + ' file' + (successful === 1 ? '' : 's') + ' JSON files updated.');
  });
};
