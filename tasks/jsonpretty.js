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
            append: '.min',
            cleanup: false
        });

        //set directory(ies)
        if (Array.isArray(options.src || options.files)) directories = options.src || options.files;
        else directories.push(options.src || options.files);

        //prettify & minify function
        function pretty(directory) {
            return function(file) {
                try {
                    //set file
                    file = directory + file;
                    //read the file and parse
                    json = JSON.parse(fs.readFileSync(file));
                    successful++;

                    fs.writeFileSync(file, JSON.stringify(json, false, options.indent));

                    if (options.minify === true) {
                        //set the file
                        var minified = file.indexOf(options.append + '.json') === -1 ? file.replace('.json', options.append + '.json') : file;
                        //read file and parse
                        json = JSON.parse(fs.readFileSync(file));
                        //clean up if enabled and file exists
                        if(options.cleanup && grunt.file.exists(file.replace('.min',''))) grunt.file.delete(file.replace('.min',''));
                        //write the minified file
                        fs.writeFileSync(minified, JSON.stringify(json));
                    }

                } catch (e) {
                    failed++;
                    grunt.log.error('File "' + file.replace(directory, '') + '" failed JSON pretty.');
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
        grunt.log.ok(successful + ' file' + (successful === 1 ? '' : 's') + ' JSON files ' + (options.minify ? 'minified': 'prettified.'));
    });
};