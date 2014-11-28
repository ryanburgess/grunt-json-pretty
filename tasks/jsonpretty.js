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
        fileContent = fs.readFileSync(fileFull);
        content = JSON.parse(fileContent);

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
    });
  });
};
