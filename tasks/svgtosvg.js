'use strict';

var path = require('path');
var grunt = require('grunt');
var buildSvg = require('./lib/buildsvg.js');

var svgtosvg = function(options) {

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
                    abspath,
                    path.join(options.dest, 'svg', subdir, filename + '_' + dimension.toString() + '.svg'),
                    dimension.toString()
                ];

                // Build SVGs.
                buildSvg.build(args);
            });
        }
    });
};

var gruntTasks = function(grunt) {
    grunt.registerTask('svgtosvg', 'Convert source SVGs into SVGs', function() {
        svgtosvg(this.options());
    });

    grunt.registerTask('default', 'svgtosvg');
};

module.exports = gruntTasks;
