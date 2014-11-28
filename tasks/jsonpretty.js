'use strict';

module.exports = function (grunt) {
  grunt.registerTask('json-pretty', function(){
    var fs = require('fs'),
      options,
      fileContent,
      fileFull,
      content,
      minFile,
      indent;

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
        fileFull = options.files + file;
        minFile = fileFull.replace('.json', '.min.json');
        fileContent = fs.readFileSync(fileFull);
        content = JSON.parse(fileContent);
        //Serialize as JSON and Write it to a file
        fs.writeFileSync(fileFull, JSON.stringify(content, null, options.indent));
        if(options.minify === true){
          fs.writeFileSync(minFile, JSON.stringify(content));
        }
    });
  });
};
