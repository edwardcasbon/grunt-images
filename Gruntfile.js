'use strict';

var config = {
    "src": "/Users/edward.casbon/Desktop/svgs",
    "dest": "/Users/edward.casbon/Desktop/svgs-dest-node",
    "sizes": [
        {
            "in": 16,
            "out": [16]
        },
        {
            "in": 24,
            "out": [24, 48, 96]
        },
        {
            "in": 32,
            "out": [32, 64, 128, 256]
        }
    ]
}

module.exports = function(grunt) {
    grunt.initConfig({

        // Convert svg source files to png files.
        svgtopng: {
            options: config
        },

        // Convert svg source files to different sized svg files.
        svgtosvg: {
            options: config
        },

        // Optimise images.
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: config.dest,
                    src: ['**/*.{png,svg}'],
                    dest: config.dest
                }]
            }
        }

    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['svgtopng', 'svgtosvg', 'imagemin']);
};
