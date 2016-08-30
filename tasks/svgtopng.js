'use strict';

var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');
var grunt = require('grunt');

var svgtopng = function(options) {

    // Loop through options.src subdirectories.
    grunt.file.recurse(options.src, function(abspath, rootdir, subdir, file){

        // If there's a subdirectory and the file is an SVG, then continue.
        if(subdir && (file.slice(-4) === ".svg")) {

            // Get the filename without the dimension.
            var filename = file.slice(0, file.lastIndexOf('_'));

            // Get the src size (denoted by the filename x_y.svg where y is the dimension)
            var sourceSize = file.slice(file.lastIndexOf('_') +1, -4);

            // Work out the output sizes from the config.sizes array.
            var outputSizes;
            options.sizes.forEach(function(s) {
                if(s.in == sourceSize) {
                    outputSizes = s.out;
                }
            });

            // Run the phantomjs process with the arguments set.
            outputSizes.forEach(function(dimension){
                var args = [
                    path.join(__dirname, './lib/buildpng.js'),
                    abspath,
                    path.join(options.dest, subdir, filename + '_' + dimension.toString() + '.png'),
                    dimension.toString()
                ];

                // Build PNGs using PhantomJS.
                childProcess.execFile(phantomjs.path, args, function(err, stdout, stderr){
                    if(err) {
                        console.error(err);
                    }
                });
            });
        }
    });
};

var gruntTasks = function(grunt) {
    grunt.registerTask('svgtopng', 'Convert source SVGs into PNGs', function() {
        svgtopng(this.options());
    });

    grunt.registerTask('default', 'svgtopng');
};

module.exports = gruntTasks;
