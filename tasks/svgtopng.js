'use strict';

var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');
var fs = require('fs');
var grunt = require('grunt');

grunt.log.warn('@TODO Update svgtopng.js to use Grunt filesystem API!');

var svgtopng = function(options) {

    // Loop through options.src subdirectories.
    fs.readdirSync(options.src).filter(function(file) {
        if(fs.statSync(path.join(options.src, file)).isDirectory()) {

            // In each subdirectory (image), grab the svgs into an array.
            var icon = file;
            var dir = path.join(options.src, file);
            var sources = fs.readdirSync(dir);

            // For each source svg,
            sources.filter(function(file) {
                if(fs.statSync(path.join(dir, file)).isFile() && ( file.slice(-4) === ".svg" ) ) {

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
                            path.join(dir, file),
                            path.join(options.dest, icon, filename + '_' + dimension.toString() + '.png'),
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
