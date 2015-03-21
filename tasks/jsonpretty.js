/*
 * grunt-json-pretty
 * https://github.com/ryanburgess/grunt-json-pretty
 *
 * Copyright (c) 2014 Ryan Burgess
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {
    grunt.registerTask('json-pretty', function() {
        var fs = require('fs'),
            options,
            directories = [],
            json,
            successful = 0,
            failed = 0;

        options = this.options({
            indent: 2,
            files: '/content/',
            minify: false,
            append: '.min'
        });

        //set directory(ies)
        if (Array.isArray(options.src || options.files)) directories = options.src || options.files;
        else directories.push(options.src || options.files);

        //prettify function
        function pretty(directory) {
            return function(file) {
                try {
                   //set file
                    file = directory + file;
                    //read the file and parse
                    json = JSON.parse(fs.readFileSync(file));
                    successful++;

                    //Serialize as JSON and Write it to a file
                    fs.writeFileSync(file, JSON.stringify(json, false, options.indent));
                    if (options.minify === true) {
                      //set the file
                      file = file.indexOf(options.append + '.json') > -1 ? file : file.replace('.json', options.append + '.json');
                      //read file and parse
                      json = JSON.parse(fs.readFileSync(file));
                      //write the minified file
                      fs.writeFileSync(file, JSON.stringify(json));
                    }
                } catch (e) {
                    failed++;
                    grunt.log.error('File "' + file + '" failed JSON pretty.');
                    grunt.fail.warn(e);
                }
            }
        }

        directories.forEach(function(directory) {
          //maybe a directory doesn't have a '/' ?
          directory = directory.slice(-1) === '/' ? directory : directory + "/";
            // Get list of files depending on the file directory
            grunt.file.expand({
                filter: 'isFile',
                cwd: directory // Change this reference to your directory
            }, ['**/*.json']).forEach(pretty(directory));
        })
        grunt.log.ok(successful + ' file' + (successful === 1 ? '' : 's') + ' JSON files prettified.');
    });
};